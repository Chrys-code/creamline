import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { listPaginatedProducers } from "../../../features/domain/producer/loaders/listProducers";
import { getProducer } from "../../../features/domain/producer/loaders/getProducer";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { producerTranslationLoader } from "../../../features/domain/producer/loaders/translation";

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
			loader: async (args: LoaderFunctionArgs) => ({
				data: await listPaginatedProducers(args),
			}),
		},
		{
			path: NAVIGATION_ROUTES.producer.create.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/producer/editProducer/EditProducer")).default,
			},
			loader: getProducer,
		},
		{
			path: NAVIGATION_ROUTES.producer.edit.path + ":id",
			lazy: {
				Component: async () =>
					(await import("../../../pages/producer/editProducer/EditProducer")).default,
			},
			loader: getProducer,
		},
	],
};

export default producerRoutes;
