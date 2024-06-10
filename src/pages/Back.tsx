import { useState } from "react"
import { insertCinema } from "../api/tmdb"

function Back() {

  const [name, setName] = useState('')
  const [adress, setAdress] = useState('')
  const [pc, setPc] = useState('')
  const [city, setCity] = useState('')
  const [screens, setScreens] = useState('')
  const [seat, setSeat] = useState('')
  const [latitude, setLat] = useState('')
  const [longitude, setLong] = useState('')

  const handleInsertCinema = () => {

    const cinemaData = {
      name,
      adress,
      pc,
      city,
      screens,
      seat,
      latitude,
      longitude
    }

    console.log(cinemaData)

    insertCinema(cinemaData)
  }

  return (
    <div className="flex min-h-screen items-center">
      <div className="bg-white rounded-lg py-4 w-full max-w-4xl mx-auto">
        <div className="text-black uppercase font-bold pt-6 text-center">Ajout d'un cinéma</div>
        <div className="px-4 pb-10 pt-3 sm:px-6 lg:px-8">
          <form className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="relative">
                <label htmlFor="name"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="Pathé Bellecour"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="adresse"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Adresse
                </label>
                <input
                  type="text"
                  name="adresse"
                  id="adresse"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="123 rue du boulevard"
                  onChange={(e) => setAdress(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="code-postal"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Code Postal
                </label>
                <input
                  type="text"
                  name="code-postal"
                  id="code-postal"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="69003"
                  onChange={(e) => setPc(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="relative">
                <label htmlFor="ville"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Ville
                </label>
                <input
                  type="text"
                  name="ville"
                  id="ville"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="Lyon"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="ecrans"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Nombre d'écrans
                </label>
                <input
                  type="text"
                  name="ecrans"
                  id="ecrans"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="4"
                  onChange={(e) => setScreens(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="fauteuils"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Nombre de fauteuils
                </label>
                <input
                  type="text"
                  name="fauteuils"
                  id="fauteuils"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="500"
                  onChange={(e) => setSeat(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="relative">
                <label htmlFor="latitude"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Latitude
                </label>
                <input
                  type="text"
                  name="latitude"
                  id="latitude"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="4.15"
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="longitude"
                       className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Longitude
                </label>
                <input
                  type="text"
                  name="longitude"
                  id="longitude"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                  placeholder="58.275"
                  onChange={(e) => setLong(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                type="button"
                className="flex w-full justify-center mt-2 text-center gap-x-2 rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:border-yellow-300 focus-visible:outline-yellow-300"
                onClick={handleInsertCinema}
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Back