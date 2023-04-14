import React from 'react'
import { HomeIcon, BanknotesIcon, ClipboardDocumentListIcon, PlusIcon, CogIcon } from '@heroicons/react/20/solid'

const NavBar = ()=>{
    return(
    <div className="homeNav">
      <div className="navMenu">
        <a href="/"><HomeIcon className="w-6 h-6"/><span className="text">&emsp;Home</span></a>
        <a href="/wishlists"><ClipboardDocumentListIcon className="w-6 h-6"/><span className="text">&emsp;My&nbsp;Wishlists</span></a>
        <a href="/new"><PlusIcon className="w-6 h-6"/><span className="text">&emsp;New&nbsp;List</span></a>
        <a href="/budget"><BanknotesIcon className="w-6 h-6"/><span className="text">&emsp;Budget</span></a>
        <a href="/settings"><CogIcon className="w-6 h-6"/><span className="text">&emsp;Settings</span></a>
      </div>
      <div className="loginTo text">
        <p className="my-6 text-md text-gray-200">
          Log in to create wishlists, budget, and more
        </p>
        <a className="hover:text-indigo-500" href="/login"> Log in</a>
      </div>
    </div>
    )
}

export default NavBar