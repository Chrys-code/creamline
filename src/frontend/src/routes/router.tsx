import { createBrowserRouter, redirect } from "react-router";

import Dashboard from "../pages/dashboard/Dashboard";
import AppLayout from "../shared/layouts/appLayout";
import ErrorLayout from "../shared/layouts/errorLayout";

import milkCollectionRoutes from "./routes/milkCollection.routes";
import pasteurisedMilkRoutes from "./routes/pasteurisedMilk.routes";
import userManagementRoutes from "./routes/userManagement.routes";
import { getProfile } from "../features/domain/profile/loaders/getProfile";
import AuthLayout from "../shared/layouts/authLayout";
import producerRoutes from "./routes/producer.routes";

const appRouter = createBrowserRouter([
	{
		id: "app",
		path: "/",
		element: <AppLayout />,
		loader: async () => {
			try {
				const profile = await getProfile();
				return { profile };
			} catch {
				throw redirect("/login");
			}
		},
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
			...milkCollectionRoutes,
			...pasteurisedMilkRoutes,
			...userManagementRoutes,
			...producerRoutes,
			{
				path: "profile",
				lazy: {
					Component: async () => (await import("../pages/profile/Profile")).default,
				},
			},
		],
	},
	{
		id: "login",
		path: "/login",
		element: <AuthLayout />,
		children: [
			{
				index: true,
				lazy: {
					Component: async () => (await import("../pages/login/Login")).default,
				},
			},
		],
	},
]);

export default appRouter;
