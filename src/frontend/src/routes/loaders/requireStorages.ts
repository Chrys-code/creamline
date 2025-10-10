import type { Storage } from "../../api/types";

import { api } from "../../api/axios";

const requireStorages = async (): Promise<Storage[]> => {
	try {
		const storageResponse = await api.get("/api/v1/storage/");
		return storageResponse;
	} catch {
		throw new Error();
	}
};

export default requireStorages;
