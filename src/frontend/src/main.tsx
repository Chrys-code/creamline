import "../src/styles/globals.scss";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router";

import Home from './pages/home/Home';
import Error from './layouts/Error';

import { user } from "./api/auth/user";

async function requireAuth() {
  const response = await user()

  if (!response.ok) {
    return redirect("/login")
  }

  const userData: { email: string } = await response.json()
  // also check for props like user id

  return { user: userData }
}

const appRouter = createBrowserRouter([
  {
    id: "appRoot",
    path: "/",
    element: <Home />,
    loader: requireAuth,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    lazy: {
      Component: async () =>
        (await import("./pages/signup/Signup")).default,
    },
    errorElement: <Error />
  },
  {
    path: "/login",
    lazy: {
      Component: async () =>
        (await import("./pages/login/Login")).default,
    },
    errorElement: <Error />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
