
import React from 'react'

const Header = ()=>{
    return(
        <header>
            <h1 className="text-lg logo font-bold tracking-tight text-white-200 sm:text-3xl">
            Budgeter
            </h1>
            <div className="d-flex align-items-center">
            <a
                href="/login"
                className="rounded-md bg-indigo-500 py-2 px-5 text-sm font-semibold text-white hover:text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Login
            </a>
                <div><i className="fa-solid fa-ellipsis-vertical"></i></div>
            </div>
        </header>
    )
}

export default Header