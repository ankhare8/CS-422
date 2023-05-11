import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/Navbar';
import Home from './components/screens/Home'
import ErrorPage from './components/screens/ErrorPage'
import Login from './components/screens/Login.jsx';
import Signup from './components/screens/Signup';
import ForgotPassword from './components/screens/ForgotPassword';
import WishLists from './components/screens/WishLists';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/screens/Logout';
import Settings from './components/screens/Settings';
import About from './components/screens/About';
import Budget from './components/screens/Budget';
import Add from './components/screens/Add';

console.log(process.env.REACT_APP_apiUrl)

const routes = [
  { 
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>
  },
  { 
    path: "/about",
    element: <About />,
  },
  { 
    path: "/login",
    element: <Login />,
  },
  { 
    path: "/signup",
    element: <Signup />,
  },
  { 
    path: "/logout",
    element: <Logout />,
  },
  { 
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  { 
    path: "/wishlists",
    element: <WishLists />,
  },
  { 
    path: "/add",
    element: <Add />,
  },
  { 
    path: "/budget",
    element: <Budget />,
  },
  { 
    path: "/settings",
    element: <Settings />,
  },
]

function App() {
  const router = createBrowserRouter(routes);
  return (
      <div className='app'>
      <Router>
      <ToastContainer theme="dark"/>
        <Header/>
        <div className="wrapper">
          <NavBar/>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </Router>
      </div>
  );
}

export default App;
