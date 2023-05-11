
import {useContext} from 'react'
import { AuthContext } from '../util/authContext';
import { Link } from 'react-router-dom';
const Header = ()=>{
    const { currentUser } = useContext(AuthContext);
    return(
        <>
            {
                currentUser ? (
                <header className='shadow'>
                    <h1 className="text-lg logo font-bold tracking-tight text-white-200 sm:text-3xl mx-auto">
                        Budgeter
                    
                    </h1>
                </header>
                ) :(
                    <header>
                        <h1 className="text-lg logo font-bold tracking-tight text-white-200 sm:text-3xl">
                        Budgeter
                        </h1>
                        <div className="d-flex align-items-center">
                            <Link
                            to="/login"
                            className="rounded-md bg-purple-500 py-2 px-5 text-sm font-semibold text-white hover:text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Login
                            </Link>
                        </div>
                    </header>
                )
            }
        </>
    )
}

export default Header