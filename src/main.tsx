import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import Movie from './pages/Movie.tsx'
import Back from './pages/Back.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import NavBar from "./Components/NavBar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/film/:id",
    element: <Movie/>,
  },
  {
    path: "/back",
    element: <Back/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar />
    <div className="root">
      <div className="body" class="w-full">
    <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>,
)
