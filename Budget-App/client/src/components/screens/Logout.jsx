import { AuthContext } from '../../util/authContext';
import { useContext} from 'react';

const Logout = function() {
    const { logout } = useContext(AuthContext);
    logout();
    return (
          <div className="mx-4 pageContainer">
            <div className="mx-auto max-w-2xl py-32 sm:py-48">
              <div className="mb-8 flex justify-center text-center">
                <div>
                <p className="text-base font-semibold text-purple-600">See You Later!</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">Logged Out</h1>
                    <p className="mt-6 text-base leading-7 text-gray-300">We hope you have a great day</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <a
                        href="/"
                        className="rounded-md bg-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                      >
                        Go back home
                      </a>
                    </div>
                </div> 
              </div>
              <div
                className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-[calc(100%-50rem)]"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
              </div>
            </div>
    )
  }

export default Logout