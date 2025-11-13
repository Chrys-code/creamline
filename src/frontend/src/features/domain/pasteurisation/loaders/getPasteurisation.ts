import type { LoaderFunctionArgs } from "react-router";
import pasteurisationClient from "../services/client";

export const getPasteurisation = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const milkResponse = await pasteurisationClient.v1_pasteurised_milk_retrieve({
			params: { id },
		});

		return milkResponse;
	} catch {
		throw new Error("Could not get pasteurisation");
	}
};
