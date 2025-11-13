import type { Producer } from "../../producer/types";

export const adaptProducersToProducerOptions = (producers: Producer[]) =>
	producers.map((producer) => ({
		id: producer.uuid,
		value: producer.name,
	}));
