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
  },
  {
    path: "/emails",
    lazy: {
      Component: async () =>
        (await import("./pages/emails/Emails")).default,
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
