
function Back() {
  return (
    <div>
        <div className="relative">
            <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Nom
            </label>
            <input
                type="text"
                name="name"
                id="name"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Pathé Bellecour"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="adresse"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Adresse
            </label>
            <input
                type="text"
                name="adresse"
                id="adresse"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="123 rue du boulevard"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="codePost"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Code Postal
            </label>
            <input
                type="text"
                name="codePost"
                id="codePost"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="69003"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="commune"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Ville
            </label>
            <input
                type="text"
                name="commune"
                id="commune"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Lyon"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="ecrans"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Nombre d'écrans
            </label>
            <input
                type="text"
                name="ecrans"
                id="ecrans"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="fauteuil"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Nombre de fauteuils
            </label>
            <input
                type="text"
                name="fauteuil"
                id="fauteuil"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="500"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="latitude"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Latitude
            </label>
            <input
                type="text"
                name="latitude"
                id="latitude"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4.15"
            />
        </div>
        <div className="relative">
            <label
                htmlFor="longitude"
                className="absolute -top-2 left-2 inline-block bg-[#242424] px-1 text-xs font-medium text-white-900"
            >
                Longitude
            </label>
            <input
                type="text"
                name="longitude"
                id="longitude"
                className="bg-[#242424] block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="58.275"
            />
        </div>
    </div>
  )
}

export default Back