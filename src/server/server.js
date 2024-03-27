import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const port = 3000;

// MongoDB Connection
const uri = 'mongodb+srv://filmotech:jn2U5c4x5zNw8Knt@filmotech.roycvfe.mongodb.net/filmotech?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const corsOptions = {
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

// Configure body-parser to accept larger payloads
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit according to your needs
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors(corsOptions));

// Example route to fetch data from MongoDB
app.get('/api/cinema/get', async (req, res) => {
    const db = client.db();
    const collection = db.collection('cinema');
    const data = await collection.find({}).toArray();
    res.json(data);
});

app.post('/api/movie-in-range', async (req, res) => {
    const db = client.db();
    const locationUser = req.body.location;
    const range = req.body.range;
    const page = parseInt(req.query.page) || 1; // Récupérer le numéro de page, par défaut 1
    const pageSize =  20; // Récupérer la taille de la page, par défaut 20
    const collection = db.collection('cinema');
    const cinema = await collection.find({}).toArray();
    const cinemas = filterCinemasByDistance({ lat: parseFloat(locationUser.latitude), lon: parseFloat(locationUser.longitude) }, cinema, range);
    const movies = [];

    for (const cinema of cinemas) {
        for (const movie of cinema.movies) {

            const movieWithCinemaInfo = {
                cinema: {
                    _id: cinema._id,
                    name: cinema.name,
                },
                movie: movie,
            };
            movies.push(movieWithCinemaInfo);
        }
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedMovies = movies.slice(startIndex, endIndex); // Sélectionner les films pour la page actuelle
    res.json({
        totalMovies: movies.length,
        totalPages: Math.ceil(movies.length / pageSize),
        currentPage: page,
        movies: paginatedMovies
    });
});
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (angle) => angle * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const earthRadius = 6371;

    const distance = earthRadius * c;

    return distance;
}

function filterCinemasByDistance(userLocation, cinemas, maxDistance) {
    return cinemas.filter(cinema => {
        const distance = haversineDistance(
            userLocation.lat, userLocation.lon,
            parseFloat(cinema.latitude), parseFloat(cinema.longitude)
        );

        return distance <= maxDistance;
    });
}
// Example route to fetch data from MongoDB
app.post('/api/cinema/insert', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('cinema');
        const data = req.body; // Assuming data is sent as JSON in the request body
        const result = await collection.insertOne(data);
        res.json({ message: `${result.insertedCount} documents inserted` });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Example route to fetch data from MongoDB
app.get('/api/comment/get/:id', async (req, res) => {
    const db = client.db();
    const id = req.params.id;
    const collection = db.collection('comment');
    const data = await collection.find({
        movieImdb: id
    }).toArray();
    res.json(data);
});

// Example route to fetch data from MongoDB
app.post('/api/comment/insert', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('comment');
        const data = req.body; // Assuming data is sent as JSON in the request body
        const result = await collection.insertMany(data);
        res.json({ message: `${result.insertedCount} documents inserted` });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/associate-movies-to-cinemas', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('cinema');
        const cinemas = await collection.find({}).toArray();
        // const comments = await collectiond.find({}).toArray();
        console.log(cinemas[0]);
        //
        const allMovies = [];
        for (let i = 1; i < 500; i++) {
            console.log('Fetching page', i);
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${i}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTg4NzNlMzRlZTE2Yjg2MTJhYjU0YmVhNTEyOGY3MSIsInN1YiI6IjY1YzBlOGRlNWUxMjAwMDE4MjFjYzk0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4QvWPT3SBchnzpCLiaIJ-3c3ucRfWvCewJtXiFEQqU',
                },
            });
            const { results: movies } = await response.json();
            allMovies.push(...movies);
            console.log('Total movies fetched:', allMovies.length);
        }

        for (const cinema of cinemas) {
            const randomMovies = [];
            const moviesToAdd = Math.min(15, allMovies.length); // Nombre maximum de films à ajouter
            const movieIdsToAdd = new Set();
            for (let index = 0; index < moviesToAdd.length; index++) {
                const randomIndex = Math.floor(Math.random() * allMovies.length);
                const randomMovie = allMovies[randomIndex];
                console.log(`Processing movie ${index + 1}/${allMovies.length}`);
                if (!cinema.movies.find(movie => movie.tmdb_id === randomMovie.id) && !movieIdsToAdd.has(randomMovie.id)) {
                    try {
                        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}?language=fr-FR&append_to_response=external_ids`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTg4NzNlMzRlZTE2Yjg2MTJhYjU0YmVhNTEyOGY3MSIsInN1YiI6IjY1YzBlOGRlNWUxMjAwMDE4MjFjYzk0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4QvWPT3SBchnzpCLiaIJ-3c3ucRfWvCewJtXiFEQqU',
                            },
                        });
                        const tmdbData = await tmdbResponse.json();
                        const genreNames = tmdbData.genres ? tmdbData.genres.map(genre => genre.name) : [];
                        randomMovies.push({
                            ...randomMovie,
                            genre_names: genreNames,
                            external_id: tmdbData.imdb_id
                        });
                        movieIdsToAdd.add(randomMovie.id);
                    } catch (error) {
                        console.error("Error fetching movie details from TMDb:", error);
                    }
                }
            }
            await collection.updateOne({ _id: cinema._id }, { $set: { movies: randomMovies } });
        }

        res.status(200).send('Movies associated with cinemas successfully !');
    } catch (error) {
        console.error('Error associating movies with cinemas:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/associate-movies-to-cinemas', async (req, res) => {
//     try {
//         const db = client.db();
//         // Récupérer tous les cinémas depuis la base de données MongoDB
//         const collection = db.collection('cinema');
//         const cinemas = await collection.find({}).toArray();
//
//         // Récupérer les films depuis la base de données externe
//
//         console.log(cinemas);
//         const allMovies = []; // Stocker tous les films récupérés
//         for (let i = 1; i < 500; i++) {
//             console.log(i);
//             const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${i}`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTg4NzNlMzRlZTE2Yjg2MTJhYjU0YmVhNTEyOGY3MSIsInN1YiI6IjY1YzBlOGRlNWUxMjAwMDE4MjFjYzk0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4QvWPT3SBchnzpCLiaIJ-3c3ucRfWvCewJtXiFEQqU',
//                 },
//             });
//             const { results: movies } = await response.json();
//             allMovies.push(...movies);
//         }
//
//         for (const cinema of cinemas) {
//             const randomMovies = [];
//             const moviesToAdd = Math.min(15, allMovies.length); // Nombre maximum de films à ajouter
//             while (randomMovies.length < moviesToAdd) {
//                 const randomIndex = Math.floor(Math.random() * allMovies.length);
//                 const randomMovie = allMovies[randomIndex];
//                 if (!cinema.movies.includes(randomMovie)) {
//                     randomMovies.push(randomMovie);
//                 }
//             }
//             await collection.updateOne({ _id: cinema._id }, { $set: { movies: randomMovies } });
//         }
//
//
//
//
//         res.status(200).send('Movies associated with cinemas successfully !');
//     } catch (error) {
//         console.error('Error associating movies with cinemas:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// Fonction pour sélectionner aléatoirement un nombre donné d'éléments dans un tableau

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
