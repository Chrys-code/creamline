import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/globals.scss"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/home/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>UH, oh, a bee has far gone from its hive :(</h1>,
  },
  {
    path: "/signup",
    lazy: {
      Component: async () =>
        (await import("./pages/signup/Signup")).default,
    },
    errorElement: <h1>UH, oh, a bee has far gone from its hive :(</h1>,
  },
  {
    path: "/login",
    lazy: {
      Component: async () =>
        (await import("./pages/login/Login")).default,
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
