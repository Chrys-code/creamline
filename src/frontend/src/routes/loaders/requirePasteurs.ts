import type { Pasteur } from "../../api/types";

import { toast } from "react-toastify";
import { api } from "../../api/axios";

const requirePasteurs = async (): Promise<Pasteur[]> => {
	try {
		const pasteursResponse = await api.get("/api/v1/pasteur/");
		return pasteursResponse;
	} catch {
		throw toast.error("Pasztőrök betöltése sikertelen.");
	}
};

export default requirePasteurs;
