import z from "zod";

export const StorageTypeEnum = z.enum(["SILO", "TUB", "CONTAINER"]);

const BaseStorageSchema = z.object({
	name: z.string().max(255),
	type: StorageTypeEnum,
});

export const CreateUpdateStorageSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid().optional(),
});

export const GetStorageSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid(),
}).passthrough();
