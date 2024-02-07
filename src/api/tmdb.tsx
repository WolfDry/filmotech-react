export const get = async (page: number = 1) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTg4NzNlMzRlZTE2Yjg2MTJhYjU0YmVhNTEyOGY3MSIsInN1YiI6IjY1YzBlOGRlNWUxMjAwMDE4MjFjYzk0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4QvWPT3SBchnzpCLiaIJ-3c3ucRfWvCewJtXiFEQqU'
    }
  };

  try {
    const [genreData, movieData] = await Promise.all([
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', options).then(response => response.json()),
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options).then(response => response.json())
    ]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const genreMap = new Map(genreData.genres.map(genre => [genre.id, genre.name]));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    console.log(movieData.results);
    const Mov = await Promise.all(movieData.results.map(async movie => {
      try {
        const extIdResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids`, options);
        const extIdData = await extIdResponse.json();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const genreNames = movie.genre_ids.map(genreId => genreMap.get(genreId));
        return {...movie, genre_names: genreNames, external_id: extIdData.imdb_id};
      } catch (err) {
        console.error(err);
      }
    }));
    return Mov;
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
    const movieData = await response.json();
    return { ...movieData };
  } catch (err) {
    console.error(err);
    throw err;
  }
};