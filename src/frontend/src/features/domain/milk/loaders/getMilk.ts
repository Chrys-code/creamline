import type { LoaderFunctionArgs } from "react-router";
import { milkClient } from "../services/client";

export const getMilk = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const milkResponse = await milkClient.v1_milk_retrieve({ params: { id } });

		return milkResponse;
	} catch {
		throw new Error("Could not load milk");
	}
};
