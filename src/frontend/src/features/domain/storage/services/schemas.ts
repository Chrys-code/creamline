import z from "zod";
import { tTyped } from "../../../../configs/i18n";

const tCommon = tTyped("common");

const BaseStorageSchema = z.object({
	name: z
		.string()
		.max(255)
		.min(1, { message: tCommon("errors.input_is_required") }),
	type: z.string().min(1, { message: tCommon("errors.input_is_required") }),
});

const StorageSchema = BaseStorageSchema.extend({
	uuid: z.string().uuid(),

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

const StorageFormSchema = BaseStorageSchema;
const CreateStorageFormSchema = BaseStorageSchema;
const PatchStorageFormSchema = BaseStorageSchema.extend({
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
