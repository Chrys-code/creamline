import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { listPaginatedProducers } from "../../../features/domain/producer/loaders/listProducers";
import { getProducer } from "../../../features/domain/producer/loaders/getProducer";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { producerTranslationLoader } from "../../../features/domain/producer/loaders/translation";
import { withUserGroupPermission } from "../../../shared/loaders/withUserGroupPermission";

const producerRoutes: RouteObject = {
	id: "producer",
	path: "/",
	loader: producerTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.producer.list.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/producer/listProducers/ListProducers")).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					data: await listPaginatedProducers(args),
				}),
				NAVIGATION_ROUTES.producer.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.producer.create.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/producer/editProducer/EditProducer")).default,
			},
			loader: withUserGroupPermission(
				getProducer,
				NAVIGATION_ROUTES.producer.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.producer.edit.path + ":id",
			lazy: {
				Component: async () =>
					(await import("../../../pages/producer/editProducer/EditProducer")).default,
			},
			loader: withUserGroupPermission(
				getProducer,
				NAVIGATION_ROUTES.producer.edit.requiredRoles
			),
		},
	],
};

export default producerRoutes;
