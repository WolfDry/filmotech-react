import {Fragment, useEffect, useState} from 'react'
import {StarIcon} from '@heroicons/react/20/solid'
import {Tab} from '@headlessui/react'
import {useParams} from 'react-router-dom';
import {getMovieById} from "../api/tmdb.tsx";
import {Movie} from "../interface/Movie.tsx";
import Review from "../Components/Review.tsx";


const product = {
  name: 'Application UI Icon Pack',
  version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
  price: '$220',
  description:
    'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
  highlights: [
    '200+ SVG icons in 3 unique styles',
    'Compatible with Figma, Sketch, and Adobe XD',
    'Drawn on 24 x 24 pixel grid',
  ],
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg',
  imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: 'July 16, 2021',
      datetime: '2021-07-16',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: 'July 12, 2021',
      datetime: '2021-07-12',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
}
const faqs = [
  {
    question: 'What format are these icons?',
    answer:
      'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.',
  },
  {
    question: 'Can I use the icons at different sizes?',
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
]
const license = {
  href: '#',
  summary:
    'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can't do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MovieOnly() {
  interface Imovie {
    movie: Movie
  }
  const [movie, setMovie] = useState<Movie | null>(null);

  const { id } = useParams();

  useEffect(() => {
    getMovieById(id!).then(data => {
      console.log(data);
      setMovie(data);
    }).catch(err => console.error(err));

  }, [id]);

  function formateDate(dateString: string) {
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

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
                  <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}
                       className=" img-movie object-cover object-center"/>
                </div>
              </div>

              {/* Product details */}
              <div
                className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{movie.title}</h1>
                    <div className="text-xl font-bold tracking-tight text-gray-500 space-x-3.5 sm:text-2xl"> {movie.tagline}</div>
                    <p className="mt-2 text-sm text-gray-500">
                      Sortie le
                      <time> {formateDate(movie.release_date)}</time>
                    </p>
                  </div>

                  <div>
                    <h3 className="sr-only">Reviews</h3>
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

                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                </div>

                <p className="mt-6 text-gray-500">{movie.overview}</p>


                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-lg font-medium text-gray-900">Genre</h3>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      {movie.genres.map((genre) => (
                        <span key={genre.id} className="text-xs ml-2 text-gray-800 border border-gray-600 rounded-full px-2 py-1 hover:bg-gray-800 hover:text-gray-50 hover:border-gray-50 transition ">
                       {genre.name}</span>
                      ))}
                    </ul>
                  </div>
                </div>



              </div>

            </div>  <Review />

          </div>
        </div>
      }
        </>

        )
      }
