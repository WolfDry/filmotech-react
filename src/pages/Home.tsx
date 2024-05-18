

import CardMovie from '../Components/CardMovie.tsx'
import Pagination from '../Components/Pagination.tsx'
import {useEffect, useState} from 'react'
import {
  get,
  getGenre,
  getMovieByLocationAndRange,
  getMovieByLocationAndRangeAndQuery,
  getMovieByTitle
} from "../api/tmdb.tsx";
import {Movie} from "../interface/Movie.tsx";
import {Production} from "../interface/Production.tsx";
import {Genre} from "../interface/Genre.tsx";
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {MapPinIcon} from "@heroicons/react/16/solid";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const sortOptions = [
  { name: 'Popularité', value: 'popularity.desc' },
  { name: 'Note', value: 'vote_average.desc' },
  { name: 'Alphabetic croissant', value: 'title.asc' },
  { name: 'Alphabetic décroissant', value: 'title.desc' },
  { name: 'Date de sortie croissante', value: 'release_date.asc' },
  { name: 'Date de sortie décroissante', value: 'primary_release_date.desc' },
]
const filters = [
  {
    id: 'localisation',
    name: 'Localisation',
    options: [
      { value: null, label: 'Locate' },
    ],
  },
  {
    id: 'genre',
    name: 'Genre',
    options: [
    ],
  },

]
export default function Home() {
  interface Imovie {
    imdb_id: string;
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
  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState<Imovie[]>([]);
  const [currentPage, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({latitude: "", longitude: ""});
  const [error, setError] = useState(null);
  const [range, setRange] = useState(1);
  const [sort, setSort] = useState('popularity.desc');
  const [choosenGenre, setChooserGenre] = useState<number[]>([]);
  const [cGenre, setcGenre] = useState<number[]>([]);
  const [showGenre, setShowGenre] = useState(true);
  const [showSort, setShowSort] = useState(true);

  const [genresLoaded, setGenresLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const query = urlParams.get('query');
    const sortParam = urlParams.get('sort')? urlParams.get('sort') : sort;
    const genreParams = urlParams.get('genres');
    const locParam = urlParams.get('loc');
    const rangeParam = urlParams.get('range');
    const searchTermUrl = query ? query : '';

    if (genreParams) {
      setcGenre(genreParams.split('-').map(Number));
    }
    setPage(page);
    setSearchTerm(searchTermUrl);
    setSort(sortParam ? sortParam : sort);

    if (locParam && searchTermUrl === '') {
      const loc = locParam.split('-');
      if (rangeParam != null) {
        setLocation({ latitude: loc[0], longitude: loc[1] });
        getMovieByLocationAndRange({ latitude: parseFloat(loc[0]).toString(), longitude: parseFloat(loc[1]).toString() }, parseInt(rangeParam), page, genreParams, sortParam!).then(data => {
          setTotalPages(data.totalPages);
          const mov = [];
          for (let i = 0; i < data.movies.length; i++) {
            mov[i] = data.movies[i].movie
            mov[i].cinemas = data.movies[i].cinemas
          }
          setPage(data.currentPage);
          setMovies(mov);

        }).catch(err => console.error(err)).finally(() => setLoading(false));
      }
    }
    else if (searchTermUrl === '' && locParam == null) {

      get(page, sortParam ? sortParam : sort, genreParams ? genreParams.split('-').map(Number).toString() : '').then(data => {
        if (data) {
          setMovies(data.movies);
          console.log()
          setTotalPages(data.totalPages);
        }
      }).catch(err => console.error(err)).finally(() => setLoading(false));
    }
    else if (searchTermUrl !== '' && locParam == null) {
      if (genreParams) {
        setcGenre(genreParams.split('-').map(Number));
      }

      getMovieByTitle(searchTermUrl, page, sortParam ? sortParam : sort).then(data => {
        if (data && data.movies) {
          setMovies(data.movies);
          setTotalPages(data.totalPages);
          setShowGenre(false);
          setShowSort(false);

        }
      }).catch(err => console.error(err)).finally(() => setLoading(false));
    }
    else if (searchTermUrl !== '' && locParam !== null) {
      const loc = locParam.split('-');
      if (rangeParam != null) {
        setLocation({ latitude: loc[0], longitude: loc[1] });
        if (genreParams) {
          setcGenre(genreParams.split('-').map(Number));
        }
        console.log(cGenre)
        getMovieByLocationAndRangeAndQuery({ latitude: parseFloat(loc[0]).toString(), longitude: parseFloat(loc[1]).toString() }, parseInt(rangeParam), page, query, genreParams, sort).then(data => {
          setTotalPages(data.totalPages);
          const mov = [];
          for (let i = 0; i < data.movies.length; i++) {
            mov[i] = data.movies[i].movie
            mov[i].cinemas = data.movies[i].cinemas
          }
          setPage(data.currentPage);
          setMovies(mov);
        }).catch(err => console.error(err)).finally(() => setLoading(false));
      }
    }
  }, [choosenGenre]);

  useEffect(() => {
    if (!genresLoaded) {
      getGenre()
        .then(data => {
          filters[1].options = data.genres.map((genre: { id: never; name: never; }) => {
            return { value: genre.id, label: genre.name }
          });
          setGenresLoaded(true);
          // setLoading(false);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, []);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, option: { value: number }) => {
    const isChecked = e.target.checked;
    setChooserGenre((prevGenres) => {
      if (isChecked) {
        return [...prevGenres, option.value];
      } else {
        return prevGenres.filter((genre) => genre !== option.value);
      }
    });

    const url = window.location.href.split('?')[0];
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', "1");

    const genreParams = queryParams.get('genres');
    const updatedGenres = genreParams ? genreParams.split('-') : [];

    if (isChecked) {
      updatedGenres.push(option.value.toString());
    } else {
      const index = updatedGenres.indexOf(option.value.toString());
      if (index !== -1) {
        updatedGenres.splice(index, 1);
      }
    }
    queryParams.set('genres', updatedGenres.join('-'));
    // window.location.href = url + '?' + queryParams.toString();
    const newUrl = url + '?' + queryParams.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
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
  const handleFormSubmitSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (location.latitude === "" && location.longitude === "") {
      handleSearchButtonClick();
    }
    else {
      handleSearchLocButtonClick();
    }
  };
  function handleSearchButtonClick() {
    const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', "1");
    queryParams.set('query', searchTerm);
    queryParams.delete('loc');
    window.location.href = url + '?' + queryParams.toString();
  }

  function handleSearchLocButtonClick() {
    const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', "1");
    queryParams.set('query', searchTerm);
    window.location.href = url + '?' + queryParams.toString();
  }
  const handleFormSubmitloc = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevents the default form submission behavior
    getLocation();
  };
  const handleFormSubmitRange = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    getMovieByLocation();
  };
  function sortMovies(sort: string) {
    setSort(sort);
    const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', "1");
    queryParams.set('sort', sort);
    window.location.href = url + '?' + queryParams.toString();
  }
  function getMovieByLocation() {
    if (range > 0 && location != null) {

        const url = window.location.href.split('?')[0]; // Récupérer l'URL sans la requête existante.
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', "1");
        queryParams.set('loc', location.latitude + '-' + location.longitude);
        queryParams.set('range', range.toString());
        const newUrl = url + '?' + queryParams.toString();
        window.history.pushState({ path: newUrl }, '', newUrl);
        setLoading(true);
      getMovieByLocationAndRange({ latitude: location.latitude.toString(), longitude: location.longitude.toString() }, range, 1, choosenGenre.toString(), sort).then(data => {
        setTotalPages(data.totalPages);
        const mov = [];
        for (let i = 0; i < data.movies.length; i++) {
          mov[i] = data.movies[i].movie
          mov[i].cinemas = data.movies[i].cinemas
        }
        setPage(data.currentPage);
        setMovies(mov);

      }).catch(err => console.error(err)).finally(() => setLoading(false));
    }
  }
  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLocation({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          latitude: position.coords.latitude,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          longitude: position.coords.longitude,
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setError(`Error: ${error.message}`);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError('Geolocation is not supported in this browser.');
    }
  };

  return (
    <>

      {loading ? <p className="text-gray-50">Chargement...</p> :
        <>
        <div className="">
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25"/>
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>

                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white hover:border-transparent p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">
                      {filters.map((section,sectionIdx) => (
                        <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                          {({open}) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button
                                  className="flex w-full items-center justify-between border-transparent border-[1px] border-solid hover:border-transparent bg-white px-2 py-3 text-sm text-gray-400">
                                  <span className="font-medium text-gray-900">{section.name} </span>
                                  {location.latitude != "" && sectionIdx == 0 ? (
                                    <span
                                      className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                                  ) : null}
                                  {cGenre.length != 0 && sectionIdx == 1 ? (
                                    <span
                                      className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {cGenre.length}
                        </span>
                                  ) : null}
                                  <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">

                                <div className="space-y-6">


                                  {section.options.map((option, optionIdx) => (

                                    <div key={option.value} className="flex items-center">

                                      {option.value != null ?
                                        <>
                                        {showGenre &&
                                            <>
                                            <input
                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                checked={cGenre.includes(option.value)}
                                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                              // @ts-expect-error
                                                onChange={(e) => handleCheckboxChange(e, {value: option.value})}
                                                className="h-4 w-4 rounded border-gray-300 text-yellow-300 focus:ring-yellow-500"
                                            />
                                          <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-500"
                                        >
                                        {option.label}
                                        </label>
                                            </>
                                      }


                                    </>
                                    :
                                    <div className="block">
                                    <div className="flex w-40 justify-center">
                                  {location.latitude == "" ?
                                    <button
                                    className="bg-white p-1 text-gray-700 justify-center flex items-center border-[1px] border-solid border-transparent hover:border-yellow-300"
                                    onClick={handleFormSubmitloc}>
                                  <MapPinIcon color={"black"} className="mr-2" width={25}/> Autour de moi
                                </button>
                                : ""}
                              </div>

                              {location.latitude && (
                                <div className=" ">

                                  <label htmlFor="locationRange" className="text-gray-600 ">Cinémas à moins
                                    de
                                    :</label>


                                  <div className="block ">
                                    <input className="w-full my-4"
                                           type="range"
                                           id="locationRange"
                                           name="locationRange"
                                           min="1"
                                           max="100"
                                           step="1"
                                           value={range}
                                           onChange={(e) => setRange(parseInt(e.target.value))}
                                      // onChange={handleRangeChange}
                                    />
                                    <p
                                      className="text-gray-500 pb-2">{range}{range > 1 ? " kms" : " km"}</p>
                                  </div>
                                  <div className="block">
                                  <button onClick={handleFormSubmitRange}
                                          className="pt-2 border-[1px] text-sm border-solid border-transparent hover:border-yellow-300">
                                    Rechercher
                                  </button>
                                  <br/>
                                  <button
                                          className="pt-2 border-[1px] mt-2 text-yellow-300 text-sm border-solid border-transparent hover:border-yellow-300">
                                    <a href="/" >Réinitialiser </a>
                                  </button>
                                  </div>

                                </div>
                              )}
                                      {error && <p className="text-gray-500 text-center">{error}</p>}
                                    </div>}
                                    </div>
                                  ))}
                                  {section.id === 'genre' && showGenre ?
                                  <button
                                    onClick={() => setcGenre([])}
                                    className="text-sm text-white">
                                    Réinitialiser
                                  </button> : ""
                                    }

                                </div>
                              </Disclosure.Panel>

                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                            </Transition.Child>
                            </div>
                            </Dialog>
                            </Transition.Root>

                 <div className="mx-auto max-w-7xl  text-center lg:max-w-7xl ">


                            <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6">
                            <h2 id="filter-heading" className="sr-only">
                            filters
                            </h2>

                            <div className="flex items-center justify-between">
                            <Menu as="div" className="relative inline-block text-left">
                            <div>
                              {showSort &&
                            <Menu.Button
                            className="group inline-flex justify-center border-[1px] border-solid border-transparent hover:border-yellow-300 text-sm font-medium text-gray-100 hover:text-gray-200">
                            Trier
                            <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-100 group-hover:text-gray-200"
                            aria-hidden="true"
                            />
                            </Menu.Button>
                              }
                            </div>

                            <Transition
                            as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions.map((option) => (
                                <Menu.Item key={option.value}>
                                    <div
                                      onClick={() => sortMovies(option.value)}
                                      className={classNames(
                                  option.value==sort ? ' cursor-pointer bg-gray-200 hover:text-orange-400' : '',
                                  'block px-4 py-2 text-sm cursor-pointer font-medium text-gray-600 hover:text-orange-400'
                                )}
                              >
                                {option.name}
                              </div>

                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="inline-block text-sm font-medium text-gray-100 hover:text-gray-200 border-[1px] border-transparent border-solid hover:border-yellow-300 sm:hidden"
                  onClick={() => setOpen(true)}
                >
                  Filters
                </button>

                <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                  {filters.map((section, sectionIdx) => (
                    <Popover
                      as="div"

                      id={`desktop-menu-${sectionIdx}`}
                      className="relative inline-block text-left"
                    >
                      <div>
                        <Popover.Button
                          className="group inline-flex items-center justify-center border-[1px] border-solid border-transparent hover:border-yellow-300 text-sm font-medium text-gray-100 hover:text-gray-200">
                          <span>{section.name}</span>
                          {location.latitude != "" && sectionIdx == 0 ? (
                            <span
                              className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                          ) : null}
                          {cGenre.length != 0 && sectionIdx == 1 ? (
                            <span
                              className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {cGenre.length}
                        </span>
                          ) : null}
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-100 group-hover:text-gray-200"
                            aria-hidden="true"
                          />
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel
                          className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-3 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                {option.value != null ?
                                  <>
                                    {showGenre &&
                                      <>
                                      <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    checked={cGenre.includes(option.value)}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    onChange={(e) => handleCheckboxChange(e, {value: option.value})}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-yellow-300 focus:ring-yellow-300"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                  >
                                    {option.label}
                                  </label>
                                    </>
                                }
                                  </>
                                  :
                                  <div className="block">
                                    <div className="flex w-40 justify-center">
                                      {location.latitude == '' || location.longitude == '' ?
                                        <button
                                          className="bg-white p-1 text-gray-700 justify-center flex items-center border-[1px] border-solid border-transparent hover:border-yellow-300"
                                          onClick={handleFormSubmitloc}>
                                          <MapPinIcon color={"black"} className="mr-2" width={25}/> Autour de moi
                                        </button>
                                        : ""}

                                    </div>
                                    {location.latitude != '' || location.longitude != '' ?
                                      <div className=" text-center">

                                        <label htmlFor="locationRange" className="text-gray-600 ">Cinémas à moins de
                                          :</label>
                                        <p className="text-gray-500">{range} {range > 1 ? "kms" : "km"}</p>
                                        <div onSubmit={handleFormSubmitRange}>
                                          <input
                                            type="range"
                                            id="locationRange"
                                            name="locationRange"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={range}
                                            onChange={(e) => setRange(parseInt(e.target.value))}
                                            // onChange={handleRangeChange}
                                          />
                                          <div className="block">
                                            <button onClick={handleFormSubmitRange}
                                                    className="pt-2 border-[1px] text-sm border-solid border-transparent hover:border-yellow-300">
                                              Rechercher
                                            </button>
                                            <br/>
                                            <button
                                              className="pt-2 border-[1px] mt-2 text-yellow-300 text-sm border-solid border-transparent hover:border-yellow-300">
                                              <a href="/">Réinitialiser </a>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      : ""}
                                    {error && <p className="text-gray-500 text-center">{error}</p>}
                                  </div>

                                }
                              </div>
                            ))}
                            {section.id === 'genre' && showGenre ?
                              <button
                                onClick={() => setcGenre([])}
                                className="text-sm text-white">
                                Réinitialiser
                              </button> : ""
                            }
                          </form>

                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}

                </Popover.Group>
              </div>
            </section>
          </div>
        </div>
        {!loading && movies.length === 0 ?
          <>
            <div className="flex w-full">
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
                onClick={handleFormSubmitSearch}
                type="button"
                className="flex w-32 justify-center  text-center ml-1  gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
              >
                Rechercher
              </button>
            </div>
            {!loading && movies.length === 0 ?
              <>
                <p className="text-gray-50 pt-2 ">Aucuns films disponible...</p>
                <a
                  href="/"
                  className="mt-6 cursor-pointer inline-flex hover:text-black w-full items-center justify-center rounded-md border border-gray-900 hover:border-yellow-900 transition bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 sm:w-auto lg:w-full"
                >
                  Revenir à l'accueil
                </a></>
              : <div></div>}
          </>
          : <>
            {loading ? <p className="text-gray-50">Chargement...</p> :
              <>
                <div className="flex  items-center justify-center pb-5 lg:justify-end">
                  <div className="w-full  lg:max-w-7xl">
                    <form onSubmit={handleFormSubmitSearch}>
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
                            onClick={handleFormSubmitSearch}
                            type="button"
                            className="flex w-32 justify-center  text-center ml-1  gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
                          >
                            Rechercher
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>

                </div>

                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {movies && movies.map((movie: Imovie, index) => (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    <><CardMovie key={index} movie={movie}/> </>
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
