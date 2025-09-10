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

import { session } from "./api/auth";
import { getProfile } from "./api/profile";

const requireAuth = async () => {
  const getSessionResponse = await session();
  if (!getSessionResponse.ok) return redirect("/login");

  const getProfileResponse = await getProfile();
  if (!getProfileResponse.ok) {
    return redirect("/login")
  }

  const profileData: {uuid: string, email:string, profile_image:string, first_name: string, last_name: string} = await getProfileResponse.json();
  return { userProfile: profileData } as AppLoaderData
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
