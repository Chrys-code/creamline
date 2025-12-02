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
	type_label: z.string(),
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
const CreateStorageFormSchema = StorageFormSchema;
const PatchStorageFormSchema = StorageFormSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const StorageTypesSchema = z.object({
	value: z.string(),
	label: z.string(),
});

const schemas = {
	StorageSchema,
	ListStorageSchema,
	PaginatedListStorageSchema,
	StorageFormSchema,
	CreateStorageFormSchema,
	PatchStorageFormSchema,
	StorageTypesSchema,
};

export default schemas;
