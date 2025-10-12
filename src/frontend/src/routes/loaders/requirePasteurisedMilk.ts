import type { LoaderFunctionArgs } from "react-router";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";

const requirePasteurisedMilk = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const milkResponse = await api.get("/api/v1/pasteurised-milk/:id/", { params: { id } });
		const data = schemas.GetPasteurisedMilkSchema.parse(milkResponse);

		return data;
	} catch {
		throw new Error();
	}
};

export default requirePasteurisedMilk;
