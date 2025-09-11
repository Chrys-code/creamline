import { createBrowserRouter } from "react-router";

import Dashboard from "../pages/Dashboard/Dashboard";
import AppLayout from "../layouts/AppLayout";
import ErrorLayout from "../layouts/ErrorLayout";

import requireAuth from "./loaders/requireAuth";
import requireProducers from "./loaders/requireProducers";


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
				path: "profile",
				lazy: {
					Component: async () =>
						(await import("../pages/Profile/Profile")).default,
				},
			},
			{
				path: "milk-collection",
				lazy: {
					Component: async () =>
						(await import("../pages/MilkCollection/MilkCollection")).default,
				},
				loader: async () => await requireProducers(),
			},
			{
				path: "add-producer",
				lazy: {
					Component: async () =>
						(await import("../pages/AddProducer/AddProducer")).default,
				},
			}
		]
	},
	{
		path: "/signup",
		lazy: {
			Component: async () =>
				(await import("../pages/Signup/Signup")).default,
		},
		errorElement: <ErrorLayout />
	},
	{
		path: "/login",
		lazy: {
			Component: async () =>
				(await import("../pages/Login/Login")).default,
		},
		errorElement: <ErrorLayout />
	},
]);

export default appRouter;