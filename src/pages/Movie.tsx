import { useEffect, useState } from 'react'
import { StarIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import { getMovieById } from "../api/tmdb.tsx";
import { Movie } from "../interface/Movie.tsx";
import Review from "../Components/Reviews.tsx";
import noImage from '/no-image.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


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
    }).catch(err => console.error(err));


  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCinemaName(id: string) {
    const response = await fetch(`${import.meta.env.VITE_END_POINT_API}/api/cinema-of-movie/${id}`);
    const data = await response.json();
    setCinemas(data);
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
          <div className="mx-auto px-4 pb-10 pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Product */}
            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              {/* Product image */}
              <div className="lg:col-span-4 lg:row-end-1">
                <div className=" flex justify-center">
                  {movie.poster_path == null ?
                    <img src={noImage} alt={movie.title}
                      className=" img-movie object-cover object-center" /> :
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}
                      className=" img-movie object-cover object-center" />
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
                                style={{ clip: 'rect(0, 1em, 1.2em, 0)' }}

                              >
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
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
                          className="border-solid cursor-pointer transition duration-100 border-orange-500 hover:text-[#252525] hover:border-[#252525] text-orange-500 border-[1px] p-2 rounded-full" /></> :
                        <><SpeakerXMarkIcon onClick={() => {
                          handleSpeak(movie?.overview)
                        }} color={"#252525"} height={35} width={35}
                          className="border-solid hover:text-orange-500 hover:border-orange-500 transition duration-100 cursor-pointer border-[#252525] border-[1px] p-2 rounded-full" /></>
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
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={false}
            >
              {cinemas.map((cinema: { name: string, adress: string, city: string, pc: string }) => (
                <div className=" pt-3">
                  <p className="text-lg font-bold text-gray-900">{cinema.name}</p>
                  <p className="text-sm text-gray-500">{cinema.adress},</p>
                  <p className="text-sm text-gray-500">{cinema.city},</p>
                  <p className="text-sm text-gray-500">{cinema.pc}</p>
                </div>
              ))}
            </Carousel>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-lg font-medium text-gray-900">Production </h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <div role="list" className="block ">
                  {movie.production_companies.length < 1 ? <p> Aucune information sur la production</p> :
                    <>
                      {movie.production_companies.map((prod) => (

                        <div key={prod.name} className="flex justify-center">
                          {prod.logo_path == null ? <p> {prod.name}</p> :
                            <img src={`https://image.tmdb.org/t/p/original${prod.logo_path}`} alt={prod.logo_path}
                              className=" h-12 object-cover prod-movie object-center my-2" />}

                        </div>
                      )
                      )
                      }
                    </>
                  }

                </div>
              </div>
            </div>
            <Review movie={movie} />

          </div>
        </div>
      }
    </>

  )
}
