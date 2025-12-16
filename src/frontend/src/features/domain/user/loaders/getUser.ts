import type { LoaderFunctionArgs } from "react-router";
import type { User } from "../types";

import { userClient } from "../services/client";

export const getUser = async ({ params }: LoaderFunctionArgs): Promise<User | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const userResponse = await userClient.getUser({ params: { uuid: id } });

		return userResponse;
	} catch {
		throw new Error("Failed to load user");
	}
};
