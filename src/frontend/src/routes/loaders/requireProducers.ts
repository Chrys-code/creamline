import type { Producer } from "../../api/types";

import { api } from "../../api/axios";

const requireProducers = async (): Promise<Producer[]> => {
	try {
		const producerResponse = await api.get("/api/v1/producer/");
		return producerResponse;
	} catch {
		throw new Error();
	}
};

export default requireProducers;
