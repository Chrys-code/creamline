import z from "zod";

export const StorageTypeEnum = z.enum(["SILO", "TUB", "CONTAINER"]);

const BaseStorageSchema = z.object({
	name: z.string().max(255),
	type: StorageTypeEnum,
});

export const StorageSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid(),
});

export const ListStorageSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(StorageSchema),
	})
	.passthrough();

export const CreateStorageSchema = BaseStorageSchema;

export const PatchStorageSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid(),
}).partial();
