import "../src/styles/globals.scss";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { AppLoaderData } from "./lib/types/AppLoaderData";


import ErrorLayout from './layouts/ErrorLayout';
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router";

import { user } from "./api/auth/user";

const requireAuth = async () => {
  const response = await user()

  if (!response.ok) {
    return redirect("/login")
  }

  const userData: { email: string } = await response.json()
  // also check for props like user id

  return { user: userData } as AppLoaderData
}

const appRouter = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <AppLayout />,
    loader: async () => await requireAuth(),
    errorElement: <AppLayout ><ErrorLayout /></AppLayout>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "milk-collection",
        lazy: {
          Component: async () =>
            (await import("./pages/MilkCollection/MilkCollection")).default,
        },
      }
    ]
  },
  {
    path: "/signup",
    lazy: {
      Component: async () =>
        (await import("./pages/Signup/Signup")).default,
    },
    errorElement: <ErrorLayout />
  },
  {
    path: "/login",
    lazy: {
      Component: async () =>
        (await import("./pages/Login/Login")).default,
    },
    errorElement: <ErrorLayout />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
