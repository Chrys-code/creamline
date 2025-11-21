import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedProducers } from "../../features/domain/producer/loaders/listProducers";
import { getProducer } from "../../features/domain/producer/loaders/getProducer";

const producerRoutes = [
	{
		path: "producer",
		lazy: {
			Component: async () =>
				(await import("../../pages/producer/listProducers/ListProducers")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedProducers(args),
		}),
	},
	{
		path: "producer/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/producer/editProducer/EditProducer")).default,
		},
		loader: getProducer,
	},
	{
		path: "producer/edit/:id",
		lazy: {
			Component: async () =>
				(await import("../../pages/producer/editProducer/EditProducer")).default,
		},
		loader: getProducer,
	},
];

export default producerRoutes;
