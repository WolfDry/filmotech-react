// import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
// import {get} from "../api/tmdb.tsx";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

import { FaStar } from "react-icons/fa";

import { useState, useEffect } from 'react'
import {get} from "../api/tmdb.tsx";


export default function Example() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Appel asynchrone de la fonction get
    get().then(data => {
      setMovies(data.results)
      console.log(data.results)
    }).catch(err => console.error(err));
  }, []);

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col ">
            <img className="mx-auto  w-full h-92 flex-shrink-0  rounded-t-lg object-cover"
                 src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
            <div className="mt-1 mb-3">
                <span className="flex justify-end items-center rounded-full  px-2 m text-xs font-medium text-gray-600 ">
                  {Math.floor(movie.vote_average)} &nbsp; <FaStar className="my-2 text-yellow-300"/>
                </span>
            </div>
            <h3 className="mb-1 text-sm font-bold text-gray-900">{movie.title}</h3>
            <div className="mt-1 mb-3 flex text-sm flex-grow flex-col justify-between text-black">
              {movie.release_date.split("-")[0]}

            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${movie.id}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  En savoir plus
                </a>
              </div>

            </div>
          </div>
        </li>
      ))}
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
            Previous
          </a>
        </div>
        <div className="hidden md:-mt-px md:flex">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            1
          </a>
          {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
            aria-current="page"
          >
            2
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            3
          </a>
          <span
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          ...
        </span>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            8
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            9
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            10
          </a>
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
          </a>
        </div>
      </nav>
    </ul>

  )
}
