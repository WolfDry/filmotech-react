import { useEffect, useState } from 'react'
import { StarIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import { getMovieById } from "../api/tmdb.tsx";
import { Movie } from "../interface/Movie.tsx";
import Review from "../Components/Reviews.tsx";
import noImage from '/no-image.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Actor} from "../interface/Actor.tsx";
import ReactPlayer from 'react-player/lazy'
import {Trailer} from "../interface/Tailer.tsx";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function MovieOnly() {

  const [onSpeak, setOnSpeak] = useState<boolean>(false);
  const handleSpeak = (text: string) => {
    setOnSpeak(!onSpeak);

    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setOnSpeak(false);
      };
      if (!onSpeak) {
        synthesis.speak(utterance);
      } else {
        synthesis.cancel();
      }
    } else {
      console.error('Text-to-speech is not supported in this browser.');
    }
  };
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinemas, setCinemas] = useState([]);
  const { id } = useParams();
  const [reviews, setReviews] = useState([])
  const [actors, setActors] = useState([])
  const [trailers, setTrailers] = useState([])
  const [showAll, setShowAll] = useState(false);


  const getReviews = (data: string) => {
    fetch(`${import.meta.env.VITE_END_POINT_API}/api/comment/get/${data}`)
      .then(response => response.json())
      .then(data => setReviews(data.reverse()))
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Défilement en douceur
    });
    getCinemaName(id!)

    getMovieById(id!).then(data => {
      setMovie(data);
      getReviews(data.imdb_id)
    }).catch(err => console.error(err)).finally(() => {
      getActors(id!)
      getTrailers(id!)
    });


  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCinemaName(id: string) {
    const response = await fetch(`${import.meta.env.VITE_END_POINT_API}/api/cinema-of-movie/${id}`);
    const data = await response.json();
    setCinemas(data);
  }

  function getActors(id: string){

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlMWUwZjFjMGQwMDZiMTgxYzg1N2JhZmU3Mzc1ZCIsInN1YiI6IjY1YzNlNGI1YzE1Zjg5MDE3Y2Y2MmViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xy9rJg2eK6R1tJBw9PJXxsrhsOz5JijdYarcch9rtJ0'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => { setActors(json.cast) })
      .catch(err => console.error('error:' + err));
  }

  function getTrailers(id: string) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=fr-FR`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlMWUwZjFjMGQwMDZiMTgxYzg1N2JhZmU3Mzc1ZCIsInN1YiI6IjY1YzNlNGI1YzE1Zjg5MDE3Y2Y2MmViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xy9rJg2eK6R1tJBw9PJXxsrhsOz5JijdYarcch9rtJ0'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => { setTrailers(json.results) })
      .catch(err => console.error('error:' + err));
  }

  function formateDate(dateString: string) {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('fr-FR', options);
  }


  return (
    <>
      {movie == null ?
        <div>Chargement...</div> :
        <div className="bg-white rounded-lg">
          <div className="mx-auto px-2 pb-10 pt-2 sm:pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Product */}
            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              {/* Product image */}
              <div className="lg:col-span-4 lg:row-end-1">
                <div className=" flex justify-center">
                  {movie.poster_path == null ?
                    <img src={noImage} alt={movie.title}
                         className=" img-movie object-cover object-center"/> :
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}
                         className=" img-movie object-cover object-center"/>
                  }

                </div>
              </div>

              {/* Product details */}
              <div
                className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{movie.title}</h1>
                    <div
                      className="text-xl font-bold tracking-tight text-gray-500 space-x-3.5 sm:text-2xl"> {movie.tagline}</div>
                    {movie.release_date == '' ?
                      <p className="mt-2 text-sm text-gray-500"> Aucune information sur la date de sortie</p> :
                      <p className="mt-2 text-sm text-gray-500">
                        Sortie le
                        <time> {formateDate(movie.release_date)}</time>
                      </p>
                    }
                  </div>

                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((index) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const rating = Math.round((movie.vote_average + reviews.reduce((acc, review) => acc + review.rating, 0)) / (reviews.length + 1)) / 2;
                        const isFilled = index < Math.floor(rating);
                        const isHalfFilled = !isFilled && index + 0.5 === rating;

                        return (
                          <div key={index} className="relative">
                            <StarIcon
                              className={'h-5 w-5 flex-shrink-0' + (isFilled ? ' text-yellow-400' : ' text-gray-300')}
                              aria-hidden="true"
                            />
                            {isHalfFilled && (
                              <div
                                className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                                style={{clip: 'rect(0, 1em, 1.2em, 0)'}}

                              >
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>


                </div>
                {movie.overview == '' ?
                  <p className=" text-gray-900"> Aucune information sur le film</p> :
                  <><p className="mt-6 text-gray-500">{movie.overview}</p>
                    <div className=" flex justify-center pt-1">
                      {onSpeak ?
                        <><SpeakerWaveIcon onClick={() => {
                          handleSpeak(movie?.overview)
                        }} color={"orange"} height={35} width={35}
                                           className="border-solid cursor-pointer transition duration-100 border-orange-500 hover:text-[#252525] hover:border-[#252525] text-orange-500 border-[1px] p-2 rounded-full"/></> :
                        <><SpeakerXMarkIcon onClick={() => {
                          handleSpeak(movie?.overview)
                        }} color={"#252525"} height={35} width={35}
                                            className="border-solid hover:text-orange-500 hover:border-orange-500 transition duration-100 cursor-pointer border-[#252525] border-[1px] p-2 rounded-full"/></>
                      }
                    </div>
                  </>
                }


                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-lg font-medium text-gray-900">Genre</h3>
                  {movie.genres.length < 1 ? <p className="text-gray-600"> Aucune information sur le genre</p> :
                    <div className="prose prose-sm mt-4 text-gray-500">
                      <ul role="list">
                        {movie.genres.map((genre) => (
                          <span key={genre.id}
                                className="text-xs ml-2 text-gray-800 border border-gray-600 rounded-full px-2 py-1 hover:bg-gray-800 hover:text-gray-50 hover:border-gray-50 transition ">
                            {genre.name}</span>
                        ))}
                      </ul>
                    </div>
                  }
                </div>
                {movie.genres.length < 1 ? "" : <div className="hidden mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-lg font-medium text-gray-900">Cinémas</h3>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      {movie.genres.map((cinema) => (
                        <span key={cinema.id}
                              className="text-xs ml-2 text-gray-800 border border-gray-600 rounded-full px-2 py-1 hover:bg-gray-800 hover:text-gray-50 hover:border-gray-50 transition ">
                          {cinema.name}</span>
                      ))}
                    </ul>
                  </div>
                </div>}

              </div>


            </div>
            {trailers.length < 1 ? "" : <div className="mt-10 w-full h-full border-t border-gray-200 pt-10">
              <h3
                className="text-lg font-medium text-gray-900">{trailers.length > 1 ? "Bandes d'annonces" : "Bande d'annonce"}</h3>
              <div className="h-full text-gray-500">
                <div role="list">
                  {trailers.filter((trailer: Trailer) => trailer.type === 'Trailer').slice(0, showAll ? trailers.length : 1).map((trailer : Trailer) => (
                    <div key={trailer.key} className="trailer my-8">
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer.key}`}
                        controls
                        width="100%"
                        height="100%"
                        className="rounded-lg"
                      />
                      <p className="text-center font-bold pt-2">{trailer.name}</p>
                    </div>
                  ))}
                </div>
                {!showAll && trailers.length > 1 && (
                  <div className="text-center mt-2">
                    <button
                      onClick={() => setShowAll(true)}
                      className="bg-yellow-500 text-white pt-2 px-4 rounded"
                    >
                      Voir plus
                    </button>
                  </div>
                )}
                {showAll && trailers.length > 1 && (
                  <div className="text-center mt-2">
                    <button
                      onClick={() => setShowAll(false)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                      Voir Moins
                    </button>
                  </div>
                )}
              </div>
            </div>}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-lg font-medium text-gray-900">Disponible dans les Cinemas </h3>
              <div className="prose prose-sm mt-4 text-gray-500 ">
                <SimpleBar  autoHide={false} color={"#fbd000"}>
                <div  className="flex sm:justify-center justify-start">
                  {cinemas.length < 1 ? <p> Aucune information sur la production</p> :
                    <>
                      {cinemas.map((cinema: { name: string, adress: string, city: string, pc: string }) => (
                        <div key={cinema.name} className="py-8 flex px-12 flex-col items-center  mx-5">
                          <div className=" pt-3 w-[350px] jus">
                            <p className="text-lg font-bold text-gray-900">{cinema.name}</p>
                            <p className="text-sm text-gray-500">{cinema.adress},</p>
                          <p className="text-sm text-gray-500">{cinema.city},</p>
                          <p className="text-sm text-gray-500">{cinema.pc}</p>
                        </div>
                      </div>
                    ))}
                    </>
                  }
                </div>
                </SimpleBar>
              </div>
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-lg font-medium text-gray-900">Production </h3>
              <div className="prose prose-sm mt-4 text-gray-500 ">
                <SimpleBar  autoHide={false} color={"#fbd000"}>
              <div role="list" className="flex justify-center">
                  {movie.production_companies.length < 1 ? <p> Aucune information sur la production</p> :
                    <>
                      {movie.production_companies.map((prod) => (
                        <div key={prod.name} className="py-8 flex justify-center px-12 flex-col items-center  mx-5">
                          {prod.logo_path == null ? <p> {prod.name}</p> :
                            <img src={`https://image.tmdb.org/t/p/original${prod.logo_path}`} alt={prod.logo_path}
                                 className=" h-12  object-contain prod-movie object-center my-2"/>}
                        </div>
                      ))}
                    </>
                  }
                </div>
                </SimpleBar>
              </div>
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-lg font-medium text-gray-900">Distribution </h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <SimpleBar  autoHide={false} >
                <div  className="flex ">
                  {actors.length < 1 ? <p> Aucun</p> :
                    <>
                    {actors.sort((a: Actor, b: Actor) => b.popularity - a.popularity).map((actor: Actor) => (
                        <div key={actor.name} className="flex ">
                          {actor.profile_path == null ?
                            <div className=" py-8 flex flex-col items-center w-[200px] mx-5">
                              <img src={noImage}
                                   alt={actor.profile_path}
                                   className=" w-full object-cover ratio  prod-movie rounded-lg object-center my-2"/>
                              <p className="text-center font-bold">{actor.name}</p>
                              <p className="text-center">Dans :  {actor.character}</p>
                            </div>
                            : <div className="  py-8 flex flex-col items-center w-[200px] mx-5">
                              <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                                   alt={actor.profile_path}
                                   className=" w-full object-cover prod-movie rounded-lg object-center my-2"/>
                              <p className="text-center font-bold">{actor.name}</p>
                              <p className="text-center">Dans :  {actor.character}</p>
                            </div>
                          }
                        </div>
                      ))}
                    </>
                  }
                </div>
                </SimpleBar>
              </div>
            </div>
            <Review movie={movie}/>

          </div>
        </div>
      }
    </>

  )
}
