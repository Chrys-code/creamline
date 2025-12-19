import { createBrowserRouter, redirect } from "react-router";

import AppLayout from "../shared/layouts/appLayout";
import ErrorLayout from "../shared/layouts/errorLayout";
import Dashboard from "../pages/dashboard/Dashboard";

import milkCollectionRoutes from "./routes/processes/milkCollection.routes";
import pasteurisationRoutes from "./routes/processes/pasteurisation.routes";
import userRoutes from "./routes/user.routes";
import producerRoutes from "./routes/utilities/producer.routes";

import storageRoutes from "./routes/utilities/storage.routes";
import pasteurRoutes from "./routes/utilities/pasteur.routes";
import productDefinitionRoutes from "./routes/utilities/productDefinition.routes";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";

import { getProfile } from "@/features/domain/user/features/profile/loaders/getProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const appRouter = createBrowserRouter([
	authRoutes,
	{
		id: "app",
		path: "/",
		element: (
			<QueryClientProvider client={queryClient}>
				<AppLayout />
			</QueryClientProvider>
		),
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
			milkCollectionRoutes,
			pasteurisationRoutes,
			userRoutes,
			producerRoutes,
			storageRoutes,
			pasteurRoutes,
			productDefinitionRoutes,
			profileRoutes,
		],
	},
]);

export default appRouter;
