import { producerClient } from "../services/client";

export const listProducers = async () => {
	try {
		const producerResponse = await producerClient.v1_producer_list();
		return producerResponse;
	} catch {
		throw new Error("Could not get producers");
	}
};
