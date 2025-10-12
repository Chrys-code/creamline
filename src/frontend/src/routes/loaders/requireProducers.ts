import z from "zod";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";

const requireProducers = async () => {
	try {
		const ProducersListSchema = z.array(schemas.GetProducerSchema);
		const producerResponse = await api.get("/api/v1/producer/");
		const parsed = ProducersListSchema.parse(producerResponse);
		return parsed;
	} catch {
		throw new Error();
	}
};

export default requireProducers;
