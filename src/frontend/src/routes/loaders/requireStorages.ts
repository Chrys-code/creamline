import z from "zod";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";

const requireStorages = async () => {
	try {
		const StorageListSchema = z.array(schemas.GetStorageSchema);
		const storageResponse = await api.get("/api/v1/storage/");
		const parsed = StorageListSchema.parse(storageResponse);
		return parsed;
	} catch {
		throw new Error();
	}
};

export default requireStorages;
