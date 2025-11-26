import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedPasteurs } from "../../features/domain/pasteur/loaders/listPasteurs";
import { getPasteur } from "../../features/domain/pasteur/loaders/getPasteur";

const pasteurRoutes = [
	{
		path: "pasteur",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteur/listPasteurs/ListPasteurs")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedPasteurs(args),
		}),
	},
	{
		path: "pasteur/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteur/editPasteur/EditPasteur")).default,
		},
		loader: getPasteur,
	},
	{
		path: "pasteur/edit/:id",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteur/editPasteur/EditPasteur")).default,
		},
		loader: getPasteur,
	},
];

export default pasteurRoutes;
