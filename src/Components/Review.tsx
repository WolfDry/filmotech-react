import {StarIcon} from '@heroicons/react/20/solid'
import {Movie} from "../interface/Movie.tsx";
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import {useState} from "react";

interface Imovie {
  movie: Movie
}

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    {rating: 5, count: 1019},
    {rating: 4, count: 162},
    {rating: 3, count: 97},
    {rating: 2, count: 199},
    {rating: 1, count: 147},
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    }, {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    }, {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },


    // More reviews...
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Review = ({movie}: Imovie) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [starsClicked, setStarsClicked] = useState(0);

  const [formCommentIsOpen, setFormCommentIsOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formFirstName, setFormFirstName] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formRating, setFormRating] = useState(0);

  const totalStars = 5;
  return (
    <div className="bg-white">
      <div
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Commentaires</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((index) => {
                  const rating = Math.round(movie.vote_average) / 2;
                  const isFilled = index < Math.floor(rating);
                  const isHalfFilled = !isFilled && index + 0.5 === rating;

                  return (
                    <div key={index} className="relative">
                      <StarIcon
                        className={classNames(
                          'h-5 w-5 flex-shrink-0',
                          isFilled ? 'text-yellow-400' : 'text-gray-300'
                        )}
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
            <p className="ml-2 text-sm text-gray-900">Basé sur {movie.vote_count} Critiques</p>
          </div>


          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Partagez vos pensées</h3>
            <p className="mt-1 text-sm text-gray-600">
              Partagez vos avis et critiques sur ce film
            </p>
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
                        console.log(starsClicked)
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
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                      placeholder="Jane"
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
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex w-full justify-center mt-2 text-center  gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
                  >
                    Envoyer
                    <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true"/>
                  </button>
                </div>
              </form>
            </div>
            <div onClick={() => setFormCommentIsOpen(!formCommentIsOpen)}
                 className="mt-6 inline-flex hover:text-black w-full items-center justify-center rounded-md border border-gray-900 hover:border-yellow-900 transition bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 sm:w-auto lg:w-full"
            >
              {!formCommentIsOpen ? <p>Ecrire un commentaire</p> : <p>Annuler</p>}
            </div>
          </div>


        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.featured.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full"/>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{__html: review.content}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

