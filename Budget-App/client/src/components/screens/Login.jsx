import { useContext, useState} from 'react';
// import { auth } from '../../services/firebase';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { AuthContext } from '../../util/authContext';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, Link} from "react-router-dom";


export default function Login() {
  const { currentUser, signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if(currentUser){
    return <Navigate to="/wishlists" />;
  }

  async function handleLogin(event) {
    event.preventDefault();
    if(email && password){
      const response = await loginWithEmailAndPassword(email, password);
      if (response.success){
        toast.success(response.success, {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate('/wishlists');
      } else{
        toast.error(response.error, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } else{
      toast.error('Please provide your email and password', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  async function handleGoogleSignIn() {
    const response = await signInWithGoogle();
    if (response.success){
      toast.success(response.success, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else{
      toast.error(response.error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <div className="mx-4 pageContainer">
      <div className="flex near-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
             <p className="mt-6 text-center text-sm text-gray-200">Log in to Get Started</p>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white-200">
              Log In
            </h2>
            <p className="mt-2 text-center text-sm text-gray-200">
              Or{' '}
              <Link to="/signup" className="font-medium text-purple-500 hover:text-purple-600">
                Create a new account
              </Link>
            </p>
          </div>
          <div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="group relative flex w-full justify-center rounded-md bg-white py-2 px-3 text-sm font-semibold text-black hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-6 h-6" />
              </span>
              Continue with Google
            </button>
          </div>
          <div className="text-center text-sm text-gray-300 lined">
          Or continue with email/password
          </div>
          <form className="mt-8 space-y-6">
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
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="show-password"
                  name="show-password"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <label htmlFor="show-password" className="ml-2 block text-sm text-white-200">
                  Show Password
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgotpassword" className="font-medium text-purple-500 hover:text-purple-600">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                onClick={(event)=> handleLogin(event)}
                type="button"
                className="group relative flex w-full justify-center rounded-md bg-purple-500 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-purple-500 group-hover:text-purple-400" aria-hidden="true" />
                </span>
                Sign In
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
