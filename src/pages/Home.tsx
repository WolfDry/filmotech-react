import CardMovie from '../Components/CardMovie.tsx'
import Pagination from '../Components/Pagination.tsx'
import {useState, useEffect} from 'react'
import {get} from "../api/tmdb.tsx";
import {Movie} from "../interface/Movie.tsx";

let totalPages: number;

export default function Home() {
  interface Imovie {
    id: number
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    genre_names: string[],
    external_id: number
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
  }, [movies, currentPage]);


  function changePage(page: number) {
    if (page < 1 || page > totalPages) {
      return;
    }

    // Update URL with the new page parameter
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url.toString());

    setPage(page);

    get(page).then((data) => {
      if (data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setMovies(data.results);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        totalPages = data.total_pages;
      }
    }).catch(err => console.error(err));
  }

  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies && movies.map((movie : Imovie) => (
          <CardMovie key={movie.id} movie={movie}/>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={changePage}/>
    </>

  )
}
