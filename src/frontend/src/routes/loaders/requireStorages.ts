import type { Storage } from "../../api/types";

import { toast } from "react-toastify";
import { api } from "../../api/axios";

const requireStorages = async (): Promise<Storage[]> => {
	try {
		const storageResponse = await api.get("/api/v1/storage/");
		return storageResponse;
	} catch {
		throw toast.error("Termelők betöltése sikertelen.");
	}
};

export default requireStorages;
