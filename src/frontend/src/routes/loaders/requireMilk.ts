import type { LoaderFunctionArgs } from "react-router";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requireMilk = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const milkResponse = await api.get("/api/v1/milk/:id/", { params: { id } });
		const data = schemas.MilkSchema.parse(milkResponse);

		return data;
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};

export default requireMilk;
