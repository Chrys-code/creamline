import { createBrowserRouter } from "react-router";

import Dashboard from "../pages/dashboard/Dashboard";
import AppLayout from "../layouts/appLayout";
import ErrorLayout from "../layouts/errorLayout";

import requireAuth from "./loaders/requireAuth";
import milkCollectionRoutes from "./routes/milkCollection.routes";
import pasteurisedMilkRoutes from "./routes/pasteurisedMilk.routes";
import userManagementRoutes from "./routes/userManagement.routes";

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
			...milkCollectionRoutes,
			...pasteurisedMilkRoutes,
			...userManagementRoutes,
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
