// import dotenv from 'dotenv';
// dotenv.config();
export const get = async (page: number = 1, sort: string, genre: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTg4NzNlMzRlZTE2Yjg2MTJhYjU0YmVhNTEyOGY3MSIsInN1YiI6IjY1YzBlOGRlNWUxMjAwMDE4MjFjYzk0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4QvWPT3SBchnzpCLiaIJ-3c3ucRfWvCewJtXiFEQqU'
    }
  };

  try {
    const [genreData, movieData] = await Promise.all([
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', options).then(response => response.json()),
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=${sort}&&with_genres=${genre}`, options).then(response => response.json())
    ]);
    const totalPages = movieData.total_pages;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const genreMap = new Map(genreData.genres.map(genre => [genre.id, genre.name]));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Mov = await Promise.all(movieData.results.map(async movie => {
      try {
        const extIdResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids`, options);
        const extIdData = await extIdResponse.json();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const genreNames = movie.genre_ids.map(genreId => genreMap.get(genreId));
        return { ...movie, genre_names: genreNames, external_id: extIdData.imdb_id };
      } catch (err) {
        console.error(err);
      }
    }));
    return { movies: Mov, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




export const getMovieById = async (id: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTg4NzNlMzRlZTE2Yjg2MTJhYjU0YmVhNTEyOGY3MSIsInN1YiI6IjY1YzBlOGRlNWUxMjAwMDE4MjFjYzk0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4QvWPT3SBchnzpCLiaIJ-3c3ucRfWvCewJtXiFEQqU'
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, options);
    const movieData = await response.json();
    return { ...movieData };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getMovieByLocationAndRange = async (locationUser: { latitude: string, longitude: string }, range: number, page: number, genre: null | string, sort: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location: locationUser, range: range, page: page, genre: genre, sort: sort })
  };
  try {
    const response = await fetch(`${import.meta.env.VITE_END_POINT_API}/api/movie-in-range`, options);



    return await response.json();
  }
  catch (err) {
    console.error(err);
    throw err;
  }
}

export const getMovieByLocationAndRangeAndQuery = async (locationUser: { latitude: string, longitude: string }, range: number, page: number, query: null | string, genre: null | string, sort: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location: locationUser, range: range, page: page, query: query, genre: genre, sort: sort })
  };
  try {
    console.log(sort)
    const response = await fetch(`${import.meta.env.VITE_END_POINT_API}/api/movie-in-range-recherche`, options);
    return await response.json();
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMovieByTitle = async (title: string, page: number = 1, sort: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlMWUwZjFjMGQwMDZiMTgxYzg1N2JhZmU3Mzc1ZCIsInN1YiI6IjY1YzNlNGI1YzE1Zjg5MDE3Y2Y2MmViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xy9rJg2eK6R1tJBw9PJXxsrhsOz5JijdYarcch9rtJ0'
    }
  };

  try {
    const [genreData, movieData] = await Promise.all([
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', options).then(response => response.json()),
      fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=fr-FR&page=${page}&sort_by=${sort}`, options).then(response => response.json())
    ]);

    const totalPages = movieData.total_pages;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const genreMap = new Map(genreData.genres.map(genre => [genre.id, genre.name]));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Mov = await Promise.all(movieData.results.map(async movie => {
      try {
        const extIdResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids`, options);
        const extIdData = await extIdResponse.json();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const genreNames = movie.genre_ids.map(genreId => genreMap.get(genreId));
        return { ...movie, genre_names: genreNames, external_id: extIdData.imdb_id, };
      } catch (err) {
        console.error(err);
      }
    }));
    return { movies: Mov, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getGenre = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlMWUwZjFjMGQwMDZiMTgxYzg1N2JhZmU3Mzc1ZCIsInN1YiI6IjY1YzNlNGI1YzE1Zjg5MDE3Y2Y2MmViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xy9rJg2eK6R1tJBw9PJXxsrhsOz5JijdYarcch9rtJ0'
    }
  };
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', options);
    const genreData = await response.json();
    return genreData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const insertCinema = async (data: Object) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlMWUwZjFjMGQwMDZiMTgxYzg1N2JhZmU3Mzc1ZCIsInN1YiI6IjY1YzNlNGI1YzE1Zjg5MDE3Y2Y2MmViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xy9rJg2eK6R1tJBw9PJXxsrhsOz5JijdYarcch9rtJ0'
    },
    body: JSON.stringify(data)
  }
  console.log(JSON.stringify(data))
  try {
    const response = await fetch(`${import.meta.env.VITE_END_POINT_API}/api/cinema`, options)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('insert OK')
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
