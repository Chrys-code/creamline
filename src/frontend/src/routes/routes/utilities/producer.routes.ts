import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedProducers } from "../../../features/domain/producer/loaders/listProducers";
import { getProducer } from "../../../features/domain/producer/loaders/getProducer";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const producerRoutes = [
	{
		path: NAVIGATION_ROUTES.producer.list,
		lazy: {
			Component: async () =>
				(await import("../../../pages/producer/listProducers/ListProducers")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedProducers(args),
		}),
	},
	{
		path: NAVIGATION_ROUTES.producer.create,
		lazy: {
			Component: async () =>
				(await import("../../../pages/producer/editProducer/EditProducer")).default,
		},
		loader: getProducer,
	},
	{
		path: NAVIGATION_ROUTES.producer.edit + ":id",
		lazy: {
			Component: async () =>
				(await import("../../../pages/producer/editProducer/EditProducer")).default,
		},
		loader: getProducer,
	},
];

export default producerRoutes;
