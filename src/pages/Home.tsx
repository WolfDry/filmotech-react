import CardMovie from '../Components/CardMovie.tsx'
import Pagination from '../Components/Pagination.tsx'
import {useState, useEffect} from 'react'
import {get} from "../api/tmdb.tsx";
import {Movie} from "../interface/Movie.tsx";
import {Production} from "../interface/Production.tsx";
import {Genre} from "../interface/Genre.tsx";

let totalPages: number;

export default function Home() {
  interface Imovie {
    imdb_id: string;
    id: number
    title: string,
    overview: string,
    vote_count: number,
    genres: Genre[],
    poster_path: string,
    vote_average: number,
    release_date: string,
    genre_names: string[],
    external_id: number,
    production_companies: Production[],
    tagline: string,
    movie: Movie
  }

  const [movies, setMovies] = useState<Imovie[]>([]);
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    setPage(page);
    get(page).then( data  => {
      if (data) {
        setMovies(data)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        totalPages = data.total_pages
      }
    }).catch(err => console.error(err));
  }, []);


  function changePage(page: number) {
    if (page < 1 || page > totalPages) {
      return;
    }
    else {
      const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('page', page.toString());
      const newUrl = url + '?' + queryParams.toString();
      window.location.href = newUrl;
    }
  }

  return (
    <>
      {movies == null ? <p className="text-gray-50">Chargement...</p> :<>
        {movies.length < 1 ? <p className="text-gray-50">Chargement...</p> :
            <>
              <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movies && movies.map((movie: Imovie,index) => (
                  <CardMovie key={index} movie={movie}/>
                ))}
              </ul>
              <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={changePage}/>
            </>
        }
      </>
      }



    </>

  )
}
