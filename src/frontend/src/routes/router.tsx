import type { MilkCollectionLoaderData, PasteurLoaderData, RootLoaderData } from "./loaders/types";
import { createBrowserRouter } from "react-router";

import Dashboard from "../pages/Dashboard/Dashboard";
import AppLayout from "../layouts/AppLayout";
import ErrorLayout from "../layouts/ErrorLayout";

import requireAuth, { type RequireAuthData } from "./loaders/requireAuth";
import requireProducers from "./loaders/requireProducers";
import requireStorages from "./loaders/requireStorages";
import requirePasteurs from "./loaders/requirePasteurs";
import requireProductDefinitions from "./loaders/requireProductDefinitions";

const appRouter = createBrowserRouter([
	{
		id: "app",
		path: "/",
		element: <AppLayout />,
		loader: async (): Promise<RootLoaderData> => ({
			profile: (await requireAuth()) as RequireAuthData,
		}),
		errorElement: (
			<AppLayout>
				<ErrorLayout />
			</AppLayout>
		),
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "profile",
				lazy: {
					Component: async () => (await import("../pages/Profile/Profile")).default,
				},
			},
			{
				path: "milk-collection",
				lazy: {
					Component: async () =>
						(await import("../pages/MilkCollection/MilkCollection")).default,
				},
				loader: async (): Promise<MilkCollectionLoaderData> => ({
					producers: (await requireProducers()) || [],
					storages: (await requireStorages()) || [],
				}),
			},
			{
				path: "pasteur",
				lazy: {
					Component: async () => (await import("../pages/Pasteur/Pasteur")).default,
				},
				loader: async (): Promise<PasteurLoaderData> => ({
					pasteurs: await requirePasteurs(),
					storages: await requireStorages(),
					productDefinitions: await requireProductDefinitions(),
				}),
			},
			{
				path: "add-producer",
				lazy: {
					Component: async () =>
						(await import("../pages/AddProducer/AddProducer")).default,
				},
			},
		],
	},
	{
		path: "/login",
		lazy: {
			Component: async () => (await import("../pages/Login/Login")).default,
		},
		errorElement: <ErrorLayout />,
	},
]);

export default appRouter;
