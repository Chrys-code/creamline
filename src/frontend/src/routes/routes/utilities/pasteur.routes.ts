import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { listPaginatedPasteurs } from "../../../features/domain/pasteur/loaders/listPasteurs";
import { getPasteur } from "../../../features/domain/pasteur/loaders/getPasteur";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { pasteurTranslationLoader } from "../../../features/domain/pasteur/loaders/translation";
import { withUserGroupPermission } from "../../../shared/loaders/withUserGroupPermission";

const pasteurRoutes: RouteObject = {
	id: "pasteur",
	path: "/",
	loader: pasteurTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.pasteur.list.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/pasteur/listPasteurs/ListPasteurs")).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					data: await listPaginatedPasteurs(args),
				}),
				NAVIGATION_ROUTES.pasteur.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.pasteur.create.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/pasteur/editPasteur/EditPasteur")).default,
			},
			loader: withUserGroupPermission(
				getPasteur,
				NAVIGATION_ROUTES.pasteur.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.pasteur.edit.path + ":id",
			lazy: {
				Component: async () =>
					(await import("../../../pages/pasteur/editPasteur/EditPasteur")).default,
			},
			loader: withUserGroupPermission(
				getPasteur,
				NAVIGATION_ROUTES.pasteur.edit.requiredRoles
			),
		},
	],
};

export default pasteurRoutes;
