import React from 'react';
import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Header from './components/Header';
import NavBar from './components/Navbar';
import Home from './components/screens/Home'
import ErrorPage from './components/screens/ErrorPage'
import Login from './components/screens/Login.jsx';
import Signup from './components/screens/Signup';
import ForgotPassword from './components/screens/ForgotPassword';
import WishLists from './components/screens/WishLists';

const routes = [
  { 
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>
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
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  { 
    path: "/wishlists",
    element: <WishLists />,
  },
]

function App() {
  const router = createBrowserRouter(routes);
  return (
    
      <div className="app">
        <Header></Header>
        <div className="wrapper">
          <NavBar />
          <RouterProvider router={router}/>
        </div>
      </div>
  );
}

export default App;
