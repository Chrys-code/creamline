import type { Producer } from "../types";

/**
 * Used to adapt Producers to generic dropdown options
 * @param producers Producer
 * @returns id, value pairs in array
 */
export const adaptProducersToProducerOptions = (producers: Producer[]) =>
	producers?.map((producer) => ({
		id: producer.uuid,
		value: producer.name,
	})) || [];
