import { FaStar } from 'react-icons/fa';
import {Link} from "react-router-dom";

const CardMovie = ({ movie }) => {
  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col">
        <img
          className="mx-auto w-full h-92 flex-shrink-0 rounded-t-lg object-cover"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt=""
        />
        <div className="mt-2 mb-3">
          <div className="flex justify-between ">
            <div className="max-w-0.5">
              {movie.genre_names.slice(0, 2).map(genre => (

                <span key={genre} className="text-xs ml-2 text-gray-500 border border-gray-300 rounded-full px-2 py-1 hover:bg-gray-800 hover:text-gray-50 hover:border-gray-50 transition ">
            {genre}
          </span>

                ))}
            </div>
              <span className="flex justify-end items-center rounded-full px-2 m text-xs font-medium text-gray-600">
            {Math.floor(movie.vote_average)} &nbsp; <FaStar className="my-2 text-yellow-300"/>
          </span>
            </div>
          </div>
          <h3 className="mb-1 text-sm font-bold text-gray-900">{movie.title}</h3>

        <div className="mt-1 mb-3 flex text-sm flex-grow flex-col justify-between text-black">
          {movie.release_date.split('-')[0]}
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              to={`/film/${movie.external_id}`}
              className="relative -mr-px inline-flex w-0 flex-1 hover:text-gray-400 transition items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardMovie;
