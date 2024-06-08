import { StarIcon } from '@heroicons/react/20/solid'
import { Movie } from "../interface/Movie.tsx";
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react";
import { Review } from '../interface/Reviews.tsx';
import Error from './Error.tsx'
import noImage from '/no-image.jpg';
import Succes from "./Succes.tsx";


interface Imovie {
  movie: Movie
}

// Replace with your key



const Reviews = ({ movie }: Imovie) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [starsClicked, setStarsClicked] = useState(0);
  const [formCommentIsOpen, setFormCommentIsOpen] = useState(false);
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)

  const getReviews = () => {
    console.log("szs");
    fetch(`${import.meta.env.VITE_END_POINT_API}/api/comment/get/${movie.imdb_id}`)
    .then(response => response.json())
    .then(data => {
        // setReviews(data.reverse())
      for (let i = 1; i <= page; i++) {
        getReviewsFromAPITMDB(data.reverse(),movie.id.toString(), i);
      }
      }
    ).finally(() => {

    })
  }

  useEffect(() => {
    getReviews();
  }, []);

  const addComment = () => {
    const data = []

    if (name === '' || name === undefined || name === ' ') {
      setError('Le nom est incorrect')
      return
    }

    if (firstName === '' || firstName === undefined || firstName === ' ') {
      setError('Le prénom est incorrect')
      return
    }

    if (comment === '' || comment === undefined || comment === ' ') {
      setError('Le commentaire est incorrect')
      return
    }

    if (starsClicked === 0 || starsClicked === undefined) {
      setError('La note est incorrect')
      return
    }

    data.push({
      "name": name,
      "firstName": firstName,
      "comment": comment,
      "rating": starsClicked,
      "movieId": movie.id,
      "movieImdb": movie.imdb_id
    })

    setName('')
    setFirstName('')
    setComment('')
    setStarsClicked(0)

    setFormCommentIsOpen(!formCommentIsOpen)
    setError('')
    setTimeout(() => {
      setSuccess('Votre commentaire a bien été ajouté')
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    })
    insertData(data)
  }
  const splitName = (fullName: string) => {
    const [firstName, ...lastName] = fullName.split(' ');
    return { firstName, name: lastName.join(' ') };
  };

  const loadMoreReviews = () => {
    setPage(prevPage => prevPage + 1);
  };

  const transformReviewData = (review: { id: string; firstName?: string; name?: string; comment?: string; rating?: string; movieId?: number; movieImdb?: string; author_details?: { name?: string; rating?: string; }; content?: string; }, movieId: number, movieImdb: string): Review => {
    const {firstName, name} = review.author_details && review.author_details.name? splitName(review.author_details.name) : {firstName: '', name: ''};
    return {
      id: review.id,
      firstName,
      name,
      comment:  review.content|| '',
      rating:review.author_details && review.author_details.rating?  parseFloat(review.author_details.rating) / 2 : 1, // Assurez-vous que la valeur par défaut est 0 si rating est null
      movieId,
      movieImdb,
    };

  };
  async function insertData(data: NonNullable<unknown>) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      fetch(`${import.meta.env.VITE_END_POINT_API}/api/comment/insert`, requestOptions)
        .then(response => response.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function getReviewsFromAPITMDB(review: Review,id: string, page: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlMWUwZjFjMGQwMDZiMTgxYzg1N2JhZmU3Mzc1ZCIsInN1YiI6IjY1YzNlNGI1YzE1Zjg5MDE3Y2Y2MmViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xy9rJg2eK6R1tJBw9PJXxsrhsOz5JijdYarcch9rtJ0'
      }
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      const movieId = json.id;
      const movieImdb = movie.imdb_id;
      const transformedReviews = json.results.map((review:{ id: string; firstName?: string; name?: string; comment?: string; rating?: string; movieId?: number; movieImdb?: string; author_details?: { name?: string; rating?: string; }; content?: string; }) => transformReviewData(review, movieId, movieImdb));

      // Translate each review and wait for all translations to complete
      await Promise.all(transformedReviews.map(async (review: Review) => {
        await translateComment(review.comment, 'fr', review.id, transformedReviews);
      }));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setReviews(() => [...review, ...transformedReviews]);
      console.log("salut");
      setTotalPages(parseInt(json.total_pages));
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async function translateComment(text: string, target: string, reviewId: string, reviews: Review[]): Promise<void> {
    try {
      const response = await fetch(`${import.meta.env.VITE_END_POINT_API}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, target })
      });

      const data = await response.json();
      console.log(data.text);

      const reviewToUpdate = reviews.find(review => review.id === reviewId);
      if (reviewToUpdate) {
        reviewToUpdate.comment = data.text;
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }





  const totalStars = 5;

  return (
    <div className="bg-white">
      <div
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Commentaires Public</h2>
          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((index) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  const rating = Math.round((movie.vote_average/2 + reviews.reduce((acc, review) => acc + review.rating, 0)) / (reviews.length + 1)) ;
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
            <p className="ml-2 text-sm text-gray-900">Basé sur {movie.vote_count + reviews.length} Critiques</p>
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Partagez vos pensées</h3>
            <p className="mt-1  text-sm text-gray-600">
              Partagez vos avis et critiques sur ce film
            </p>
            {
              error &&
              <Error erreur={error} />
            }
            <div className={`${formCommentIsOpen ? '' : 'hidden'}`}>
              <form action="#" method="POST">
                <div className="my-2 flex justify-center">
                  {[...Array(totalStars)].map((_, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <StarIcon onClick={() => {
                        setStarsClicked(index + 1)
                      }}
                        className={`text-${starsClicked >= index + 1 ? 'yellow-400' : hoveredIndex! >= index ? 'yellow-300' : 'gray-200'} hover:text-yellow-300 cursor-pointer h-10 w-10`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                      placeholder="Smith"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative">
                    <label
                      htmlFor="firstName"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                      placeholder="Jane"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Commentaire
                      </label>
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block px-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex w-full justify-center mt-2 text-center  gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
                    onClick={() => { addComment() }}
                  >
                    Envoyer
                    <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
            <div onClick={() => setFormCommentIsOpen(!formCommentIsOpen)}
              className="mt-6 inline-flex hover:text-black w-full items-center justify-center rounded-md border border-gray-900 hover:border-yellow-900 transition bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 sm:w-auto lg:w-full"
            >
              {!formCommentIsOpen ? <p className="cursor-pointer">Ecrire un commentaire</p> : <p className="cursor-pointer">Annuler</p>}
            </div>
            {
              success &&
              <div className="mt-4">
                <Succes succes={success} />
              </div>
            }
          </div>
        </div>
        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>
          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.map((review: Review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <img src={noImage} alt={`${review.firstName}.`} className="h-12 w-12 rounded-full"/>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.firstName + ' ' + review.name}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating, index) => (
                          <StarIcon
                            key={index}
                            className={'h-5 w-5 flex-shrink-0 ' + (review.rating > rating ? 'text-yellow-400' : 'text-gray-300')}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>
                  <div
                    className="mt-4 space-y-6 text-left text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{__html: review.comment}}
                  />
                  <p  className="mt-4 space-y-6 text-left text-xs text-base italic text-gray-600"> Traduit par google traduction </p>
                </div>
              ))}
              {page < totalPages && (
                <div className="mt-16">
                  <button
                    type="button"
                    className="mt-16 inline-flex items-center justify-center rounded-md border border-gray-900 hover:border-yellow-900 transition bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 sm:w-auto lg:w-full"
                    onClick={loadMoreReviews}
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

