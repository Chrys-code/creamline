import { createBrowserRouter } from "react-router";

import Dashboard from "../pages/dashboard/Dashboard";
import AppLayout from "../layouts/appLayout";
import ErrorLayout from "../layouts/errorLayout";

import requireAuth from "./loaders/requireAuth";
import requireProducers from "./loaders/requireProducers";
import requireStorages from "./loaders/requireStorages";
import requirePasteurs from "./loaders/requirePasteurs";
import requireProductDefinitions from "./loaders/requireProductDefinitions";
import requirePaginatedMilkList from "./loaders/requirePaginatedMilkList";
import requirePaginatedPasteurisedMilkList from "./loaders/requirePaginatedPasteurisedMilkList";
import requireMilk from "./loaders/requireMilk";
import requirePasteurisedMilk from "./loaders/requirePasteurisedMilk";

const appRouter = createBrowserRouter([
	{
		id: "app",
		path: "/",
		element: <AppLayout />,
		loader: async () => ({
			profile: await requireAuth(),
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
					Component: async () => (await import("../pages/profile/Profile")).default,
				},
			},
			{
				path: "milk-collection",
				lazy: {
					Component: async () =>
						(await import("../pages/milkCollectionList/MilkCollectionList")).default,
				},
				loader: requirePaginatedMilkList,
			},
			{
				path: "milk-collection/new",
				lazy: {
					Component: async () =>
						(await import("../pages/milkCollection/MilkCollection")).default,
				},
				loader: async () => ({
					producers: (await requireProducers()) || [],
					storages: (await requireStorages()) || [],
				}),
			},
			{
				path: "milk-collection/:id",
				lazy: {
					Component: async () =>
						(await import("../pages/milkCollection/MilkCollection")).default,
				},
				loader: async (args) => ({
					producers: (await requireProducers()) || [],
					storages: (await requireStorages()) || [],
					selectedItem: (await requireMilk(args)) || null,
				}),
			},
			{
				path: "pasteurised-milk",
				lazy: {
					Component: async () =>
						(await import("../pages/pasteurisedMilkList/PasteurisedMilkList")).default,
				},
				loader: requirePaginatedPasteurisedMilkList,
			},
			{
				path: "pasteurised-milk/new",
				lazy: {
					Component: async () =>
						(await import("../pages/pasteurisation/Pasteurisation")).default,
				},
				loader: async () => ({
					pasteurs: (await requirePasteurs()) || [],
					storages: (await requireStorages()) || [],
					productDefinitions: (await requireProductDefinitions()) || [],
				}),
			},
			{
				path: "pasteurised-milk/:id",
				lazy: {
					Component: async () =>
						(await import("../pages/pasteurisation/Pasteurisation")).default,
				},
				loader: async (args) => ({
					pasteurs: (await requirePasteurs()) || [],
					storages: (await requireStorages()) || [],
					productDefinitions: (await requireProductDefinitions()) || [],
					selectedItem: (await requirePasteurisedMilk(args)) || null,
				}),
			},
			{
				path: "add-producer",
				lazy: {
					Component: async () =>
						(await import("../pages/addProducer/AddProducer")).default,
				},
			},
		],
	},
	{
		path: "/login",
		lazy: {
			Component: async () => (await import("../pages/login/Login")).default,
		},
		errorElement: <ErrorLayout />,
	},
]);

export default appRouter;
