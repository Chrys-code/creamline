import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedPasteurs } from "../../../features/domain/pasteur/loaders/listPasteurs";
import { getPasteur } from "../../../features/domain/pasteur/loaders/getPasteur";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const pasteurRoutes = [
	{
		path: NAVIGATION_ROUTES.pasteur.list,
		lazy: {
			Component: async () =>
				(await import("../../../pages/pasteur/listPasteurs/ListPasteurs")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedPasteurs(args),
		}),
	},
	{
		path: NAVIGATION_ROUTES.pasteur.create,
		lazy: {
			Component: async () =>
				(await import("../../../pages/pasteur/editPasteur/EditPasteur")).default,
		},
		loader: getPasteur,
	},
	{
		path: NAVIGATION_ROUTES.pasteur.edit + ":id",
		lazy: {
			Component: async () =>
				(await import("../../../pages/pasteur/editPasteur/EditPasteur")).default,
		},
		loader: getPasteur,
	},
];

export default pasteurRoutes;
