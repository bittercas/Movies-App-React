import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import NotFound from './components/NotFound.jsx';
import HomeTrailer  from './HomeTrailer.jsx'
import Register  from './Register.jsx'
import Login  from './Login.jsx'
import PrivatePage  from './PrivatePage.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/movie/:title", element: <HomeTrailer/>},
  {path: "/register", element: <Register/>},
  {path: "/login", element: <Login/>},
  {path: "/userloggedin", element: <PrivatePage/>},
  {path: "*", element: <NotFound/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);


