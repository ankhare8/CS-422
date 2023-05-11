import {useContext} from 'react'
import { HomeIcon, BanknotesIcon, ListBulletIcon, InformationCircleIcon, CogIcon, SparklesIcon, PlusIcon } from '@heroicons/react/20/solid'
import { AuthContext } from '../util/authContext';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ()=>{  
  const { currentUser } = useContext(AuthContext);
  return(
  <div className="homeNav">
    {
      (currentUser === null) ? (
        <>
          <div className="navMenu">
            <NavLink to="/">
              <HomeIcon className="w-6 h-6"/><span className="text">&emsp;Home</span>
            </NavLink>
            <NavLink to="/demo"><SparklesIcon className="w-6 h-6"/><span className="text">&emsp;Demo</span></NavLink >
            <NavLink to="/about"><InformationCircleIcon className="w-6 h-6"/><span className="text">&emsp;About</span></NavLink >
            </div>
            <div className="loginTo text">
              <p className="my-6 text-md text-gray-200">
                Log in to create wishlists, budget, and more
              </p>
              <Link className="hover:bg-purple-600" to="/login"> Log in </Link>
            </div>
          </>
      ): (
        <div className="navMenu">
          <NavLink to="/wishlists"><ListBulletIcon className="w-6 h-6"/><span className="text">&emsp;Wishlists</span></NavLink>
          <NavLink to="/add"><PlusIcon className="w-6 h-6"/><span className="text">&emsp;Create</span></NavLink>
          <NavLink to="/budget"><BanknotesIcon className="w-6 h-6"/><span className="text">&emsp;Budget</span></NavLink >
          <NavLink to="/settings"><CogIcon className="w-6 h-6"/><span className="text">&emsp;Settings</span></NavLink >
          <NavLink to="/about"><InformationCircleIcon className="w-6 h-6"/><span className="text">&emsp;About</span></NavLink >
        </div>
      )
    }
  </div>
  )
}

export default NavBar