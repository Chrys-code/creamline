const producerRoutes = [
	{
		path: "producer/create",
		lazy: {
			Component: async () => (await import("../../pages/producer/EditProducer")).default,
		},
	},
];

export default producerRoutes;
