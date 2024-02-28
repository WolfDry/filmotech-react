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
    const collection = db.collection('cinema');
    const cinema = await collection.find({}).toArray();
    const cinemas = filterCinemasByDistance({ lat: parseFloat(locationUser.latitude), lon: parseFloat(locationUser.longitude) }, cinema, range);

    //get tab ids cinema
    //  const tabCinemaId = cinemas.map(cinema => {return(cinema.movies);});
    res.json(cinemas);
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
