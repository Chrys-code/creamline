import type { LoaderFunctionArgs } from "react-router";
import { pasteurClient } from "../services/client";

export const getPasteur = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const pasteurResponse = await pasteurClient.getPasteur({ params: { id } });
		return pasteurResponse;
	} catch {
		throw new Error("Could not get pasteur");
	}
};
