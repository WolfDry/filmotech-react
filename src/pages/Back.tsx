
function Back() {
    return (
        <form>
            <div className="space-y-12 flex flex-col items-center justify-center">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="font-semibold leading-7 text-white">Ajout de cinéma</h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12 max-w-6xl">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2 sm:col-start-1">
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
                        </div>
                        <div className="sm:col-span-2">
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
                        </div>
                        <div className="sm:col-span-2">
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
                        </div>
                        <div className="sm:col-span-2 sm:col-start-1">
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
                        </div>
                        <div className="sm:col-span-2">
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
                        </div>
                        <div className="sm:col-span-2">
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
                        </div>
                        <div className="sm:col-span-3">
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
                        </div>
                        <div className="sm:col-span-3">
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
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default Back