import z from "zod";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requirePasteurs = async () => {
	try {
		const PasteurListSchema = z.array(schemas.PasteurSchema);
		const pasteursResponse = await api.get("/api/v1/pasteur/");
		const parsed = PasteurListSchema.parse(pasteursResponse);
		return parsed;
	} catch {
		throw new Error();
	}
};

export default requirePasteurs;
