import z from "zod";
import { tTyped } from "../../../../configs/i18n";

const tCommon = tTyped("common");

const ProducerBaseSchema = z.object({
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

export const ProducerSchema = ProducerBaseSchema.extend({
	uuid: z.string().uuid(),
});

export const CreateProducerFormSchema = ProducerBaseSchema;

export const PatchProducerFormSchema = ProducerBaseSchema.extend({
	uuid: z.string().uuid(),
});

const schemas = {
	ProducerSchema,
	CreateProducerFormSchema,
	PatchProducerFormSchema,
};

export default schemas;
