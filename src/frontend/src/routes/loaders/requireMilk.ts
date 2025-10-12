import type { LoaderFunctionArgs } from "react-router";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";

const requireMilk = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const milkResponse = await api.get("/api/v1/milk/:id/", { params: { id } });
		const data = schemas.GetMilkSchema.parse(milkResponse);

		return data;
	} catch {
		throw new Error();
	}
};

export default requireMilk;
