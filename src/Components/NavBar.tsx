import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import OfflineBanner from './OfflineBanner';

export default function NavBar() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-600 nav shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/" className="text-white hover:text-yellow-300 font-bold text-2xl">
                      FILMOTECH
                    </a>
                  </div>
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    <a
                      href="/"
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-white ${
                        location.pathname === '/' ? 'border-yellow-300 hover:text-yellow-300' : 'border-transparent hover:border-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      Acceuil
                    </a>
                    <a
                      href="/back"
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-white ${
                        location.pathname === '/back' ? 'border-yellow-300 hover:text-yellow-300' : 'border-transparent hover:border-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      Ajouter un Cinéma
                    </a>
                  </div>
                </div>

                <div className="flex items-center lg:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    location.pathname === '/' ? 'border-yellow-300 bg-gray-700 hover:text-yellow-300 text-yellow-400 hover:bg-gray-800' : 'border-white text-gray-50 hover:bg-gray-800 hover:border-gray-300 hover:text-yellow-300'
                  }`}
                >
                  Accueil
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/back"
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    location.pathname === '/back' ? 'border-yellow-300 bg-gray-700 hover:text-yellow-300 text-yellow-400 hover:bg-gray-800' : 'border-white text-gray-50 hover:bg-gray-800 hover:border-gray-300 hover:text-yellow-300'
                  }`}
                >
                  Ajouter un Cinéma
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {!isOnline && <OfflineBanner />}
    </>
  );
}
