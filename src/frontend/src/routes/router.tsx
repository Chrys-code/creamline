import { createBrowserRouter, redirect } from "react-router";

import AppLayout from "../shared/layouts/appLayout";
import AuthLayout from "../shared/layouts/authLayout";
import ErrorLayout from "../shared/layouts/errorLayout";
import Dashboard from "../pages/dashboard/Dashboard";

import milkCollectionRoutes from "./routes/milkCollection.routes";
import userRoutes from "./routes/user.routes";
import producerRoutes from "./routes/producer.routes";
import pasteurisationRoutes from "./routes/pasteurisation.routes";

import { getProfile } from "../features/domain/profile/loaders/getProfile";
import storageRoutes from "./routes/storage.routes";
import pasteurRoutes from "./routes/pasteur.routes";

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
			...pasteurisationRoutes,
			...userRoutes,
			...producerRoutes,
			...storageRoutes,
			...pasteurRoutes,
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
