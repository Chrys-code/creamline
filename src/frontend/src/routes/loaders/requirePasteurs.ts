import type { Pasteur } from "../../api/types";

import { api } from "../../api/axios";

const requirePasteurs = async (): Promise<Pasteur[]> => {
	try {
		const pasteursResponse = await api.get("/api/v1/pasteur/");
		return pasteursResponse;
	} catch {
		throw new Error();
	}
};

export default requirePasteurs;
