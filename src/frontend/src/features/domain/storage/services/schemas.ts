import z from "zod";
import { tTyped } from "../../../../configs/i18n";

const tCommon = tTyped("common");

const StorageSchema = z.object({
	name: z.string(),
	uuid: z.string().uuid(),
	type: z.string(),
	type_uuid: z.string(),

	created_at: z.string(),
	updated_at: z.string(),
});

const ListStorageSchema = z.array(StorageSchema);

const PaginatedListStorageSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(StorageSchema),
	})
	.passthrough();

const StorageFormSchema = z.object({
	name: z
		.string()
		.max(255)
		.min(1, { message: tCommon("errors.input_is_required") }),
	type: z.string().min(1, { message: tCommon("errors.input_is_required") }),
});

const CreateStorageFormSchema = StorageFormSchema;
const PatchStorageFormSchema = StorageFormSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	StorageSchema,
	ListStorageSchema,
	PaginatedListStorageSchema,
	StorageFormSchema,
	CreateStorageFormSchema,
	PatchStorageFormSchema,
};

export default schemas;
