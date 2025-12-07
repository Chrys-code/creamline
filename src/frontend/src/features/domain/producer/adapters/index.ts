import type { Producer } from "../types";

export const adaptProducersToProducerOptions = (producers: Producer[]) =>
	producers?.map((producer) => ({
		id: producer.uuid,
		value: producer.name,
	})) || [];
