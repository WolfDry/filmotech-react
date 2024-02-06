import CardMovie from '../Components/CardMovie.tsx'
import Pagination from '../Components/Pagination.tsx'
import { useState, useEffect } from 'react'
import {get} from "../api/tmdb.tsx";
let totalPages : number;

export default function Example() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    setPage(page);
    get(page).then(data => {
      setMovies(data)
      totalPages = data.total_pages
    }).catch(err => console.error(err));
  }, [movies,currentPage]);


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
      setMovies(data.results);
      totalPages = data.total_pages;
    }).catch(err => console.error(err));
  }
  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies && movies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={changePage} />
    </>

  )
}
