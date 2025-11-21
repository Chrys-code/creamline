import type { LoaderFunctionArgs } from "react-router";
import type { Producer } from "../types";
import { producerClient } from "../services/client";

export const getProducer = async ({ params }: LoaderFunctionArgs): Promise<Producer | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const userResponse = await producerClient.v1_producer_retrieve({ params: { uuid: id } });

		return userResponse;
	} catch {
		throw new Error("Failed to load producer");
	}
};
