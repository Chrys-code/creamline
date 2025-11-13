import z from "zod";

const BaseStorageSchema = z.object({
	name: z.string().max(255),
	type: z.string(),
});

const StorageSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid(),
});

const CreateStorageFormSchema = BaseStorageSchema;

const PatchStorageFormSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	StorageSchema,
	CreateStorageFormSchema,
	PatchStorageFormSchema,
};

export default schemas;
