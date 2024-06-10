import { useState } from "react"
import { insertCinema } from "../api/tmdb"

function Back() {

  const [nom, setNom] = useState('')
  const [adresse, setAdresse] = useState('')
  const [cp, setCp] = useState('')
  const [ville, setVille] = useState('')
  const [screens, setScreens] = useState('')
  const [seat, setSeat] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const handleInsertCinema = () => {

    const cinemaData = {
      nom,
      adresse,
      cp,
      ville,
      screens,
      seat,
      lat,
      long
    }

    console.log(cinemaData)

    insertCinema(cinemaData)
  }

  return (
    <div className="flex min-h-[100vh] align-middle items-center ">
      <div className="bg-white rounded-lg py-4  ">
        <div className="w-[1100px]">
          <div className="text-black uppercase font-bold pt-6">Ajout d'un cinema</div>
          <div className="mx-auto px-4 pb-10 pt-3 sm:px-6 lg:max-w-7xl lg:px-8 ">
            {/* Product */}

            <div className="">

              <form className="w-full  ">
                <div className="flex">
                  <div className="mt-8 mx-2 w-full">
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
                        placeholder="Pathé Bellecour"
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Adresse
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="123 rue du boulevard"
                        onChange={(e) => setAdresse(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Code Postal
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="69003"
                        onChange={(e) => setCp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Ville
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="Lyon"
                        onChange={(e) => setVille(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Nombre d'écrans
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="4"
                        onChange={(e) => setScreens(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Nombre de fauteuils
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="500"
                        onChange={(e) => setSeat(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Latitude
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="4.15"
                        onChange={(e) => setLat(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-8 mx-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                      >
                        Longitude
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                        placeholder="58.275"
                        onChange={(e) => setLong(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    className="flex w-full justify-center mt-2 text-center  gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
                    onClick={handleInsertCinema}
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Back