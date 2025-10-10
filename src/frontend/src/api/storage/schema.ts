import z from "zod";

const StorageTypeEnum = z.enum(["SILO", "TUB", "CONTAINER"]);
const StorageSchema = z
	.object({
		uuid: z.string().uuid(),
		name: z.string().max(255),
		type: StorageTypeEnum,
	})
	.passthrough();

export { StorageSchema, StorageTypeEnum };
