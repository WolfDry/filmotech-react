import CardMovie from '../Components/CardMovie.tsx'
import Pagination from '../Components/Pagination.tsx'
import {useEffect, useState} from 'react'
import {get, getMovieByTitl} from "../api/tmdb.tsx";
import {Movie} from "../interface/Movie.tsx";
import {Production} from "../interface/Production.tsx";
import {Genre} from "../interface/Genre.tsx";
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';


export default function Home() {
  interface Imovie {
    id: number
    title: string,
    overview: string,
    vote_count: number,
    genres: Genre[],
    poster_path: string,
    total_results: number,
    total_pages: number,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const query = urlParams.get('query');
    const searchTermUrl = query ? query : '';
    setPage(page);
    setSearchTerm(searchTermUrl);
    if (searchTermUrl === '') {
      get(page).then(data => {
        if (data) {
          setMovies(data.movies);
          setTotalPages(data.totalPages);
          setLoading(false);
        }
      }).catch(err => console.error(err));
    } else {
      getMovieByTitl(searchTermUrl, page).then(data => {
        if (data && data.movies) {
          setMovies(data.movies);
          console.log(data.movies);
          setTotalPages(data.totalPages);
          setLoading(false);
        }
      }).catch(err => console.error(err));
    }
  }, []);


  function changePage(page: number) {
    if (page < 1 || page > totalPages) {
      return;
    } else {
      const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('page', page.toString());
      window.location.href = url + '?' + queryParams.toString();
    }
  }

  function handleSearchButtonClick() {
    const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', "1");
    queryParams.set('query', searchTerm);
    window.location.href = url + '?' + queryParams.toString();
  }

  return (
    <>
      {loading ? <p className="text-gray-50">Chargement...</p> : <>
        {movies.length == 0 ?
          <>
            <p className="text-gray-50">Aucuns films disponible...</p>
            <a
              href="/"
              className="mt-6 cursor-pointer inline-flex hover:text-black w-full items-center justify-center rounded-md border border-gray-900 hover:border-yellow-900 transition bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 sm:w-auto lg:w-full"
            >
              Revenir à l'accueil
            </a>
          </>

          : <>
            {movies.length < 1 ? <p className="text-gray-50">Chargement...</p> :
              <>
                <div className="flex  items-center justify-center pb-5 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-7xl">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                      </div>
                      <div className="flex">
                        <input
                          onChange={(e) => setSearchTerm(e.target.value)}
                          value={searchTerm}
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                          placeholder="Rechercher un film..."
                          type="search"
                        />
                        <button
                          onClick={handleSearchButtonClick}
                          type="button"
                          className="flex w-32 justify-center  text-center ml-1  gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
                        >
                          Rechercher
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {movies && movies.map((movie: Imovie, index) => (
                    <>{movie.external_id ? <CardMovie key={index} movie={movie}/> : null}</>
                  ))}
                </ul>
                <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={changePage}/>
              </>
            }
          </>
        }
      </>}


    </>

  )
}
