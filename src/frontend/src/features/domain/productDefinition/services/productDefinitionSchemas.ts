import z from "zod";
import { tTyped } from "@/configs/i18n";

const tCommon = tTyped("common");

const BaseProductDefinitionSchema = z.object({
	name: z
		.string()
		.max(255)
		.min(1, { message: tCommon("errors.input_is_required") }),
	type: z.string({ message: tCommon("errors.input_select_required") }),
});

const ProductDefinitionSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid(),
	type_label: z.string(),
});
const ListProductDefinitionSchema = z.array(ProductDefinitionSchema);

const PaginatedListProductDefinitionSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(ProductDefinitionSchema),
	})
	.passthrough();

const ProductDefinitionFormSchema = BaseProductDefinitionSchema;
const CreateProductDefinitionFormSchema = ProductDefinitionFormSchema;
const PatchProductDefinitionFormSchema = ProductDefinitionFormSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const ProductDefinitionOptionsSchema = z.object({
	value: z.string(),
	label: z.string(),
});

const schemas = {
	ProductDefinitionSchema,
	ListProductDefinitionSchema,
	PaginatedListProductDefinitionSchema,
	ProductDefinitionFormSchema,
	CreateProductDefinitionFormSchema,
	PatchProductDefinitionFormSchema,
	ProductDefinitionOptionsSchema,
};

export default schemas;
