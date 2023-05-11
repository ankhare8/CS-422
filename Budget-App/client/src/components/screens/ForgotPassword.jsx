import { useState, useContext} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { AuthContext } from '../../util/authContext';

export default function ForogtPassword() {
  const { currentUser, sendPasswordEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  if(currentUser){
    return <Navigate to="/wishlists" />;
  }

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    setEmail(email.trim())

    if(email.length > 0){
      const response = await sendPasswordEmail(email);
      if (response.success){
        toast.success(response.success, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else{
        toast.error(response.error, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } else{
      toast.error('Please provide your email', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <div className="mx-4 pageContainer">
      <div className="flex near-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
             <p className="mt-6 text-center text-sm text-gray-200">Forgot your password? It happens.</p>
             <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white-200">
              Reset Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-gray-200">
                Remembered?{' '}
                <Link to="/login" className="font-medium text-purple-500 hover:text-purple-500">
                    Login
                </Link>
            </p>

            <div>
              <button
                type="button"
                onClick={(event)=>handleForgotPasswordSubmit(event)}
                className="group relative flex w-full justify-center rounded-md bg-purple-500 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-purple-500 group-hover:text-purple-400" aria-hidden="true" />
                </span>
                Send Recovery Email
              </button>
            </div>
          </form>
          <div
            className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
