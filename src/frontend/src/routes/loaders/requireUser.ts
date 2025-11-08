import type { LoaderFunctionArgs } from "react-router";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requireUser = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const userResponse = await api.get("/api/v1/users/:uuid/", { params: { uuid: id } });
		const data = schemas.UserSchema.parse(userResponse);

		return data;
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};

export default requireUser;
