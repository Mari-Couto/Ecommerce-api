import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './routes/Home.jsx'

import { createBrowserRouter, RouterProvider, Route} from 'react-router-dom';
import ErrorPage from './routes/ErrorPage.jsx'

import Products from './routes/Products.jsx'
import Orders from './routes/Orders.jsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "produtos",
        element: <Products/>
      },
      {
        path: "pedidos",
        element: <Orders/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
