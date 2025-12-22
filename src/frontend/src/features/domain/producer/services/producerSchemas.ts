import z from "zod";
import { tTyped } from "@/configs/i18n";

const tCommon = tTyped("common");

const BaseProducerSchema = z.object({
	name: z
		.string()
		.max(255)
		.min(1, { message: tCommon("errors.input_is_required") }),
	address: z
		.string()
		.min(1, { message: tCommon("errors.input_is_required") })
		.max(100),
	contact_email: z
		.string()
		.max(256)
		.email({ message: tCommon("errors.input_is_required") })
		.or(z.literal(""))
		.nullish(),
});

const ProducerSchema = BaseProducerSchema.extend({
	uuid: z.string().uuid(),

	created_at: z.string(),
	updated_at: z.string(),
	deleted_at: z.string().nullish(),
});

const ListProducerSchema = z.array(ProducerSchema);

const PaginatedListProducerSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(ProducerSchema),
	})
	.passthrough();

const ProducerFromSchema = BaseProducerSchema;
const CreateProducerFormSchema = BaseProducerSchema;
const PatchProducerFormSchema = BaseProducerSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	ProducerSchema,
	ListProducerSchema,
	PaginatedListProducerSchema,
	ProducerFromSchema,
	CreateProducerFormSchema,
	PatchProducerFormSchema,
};

export default schemas;
