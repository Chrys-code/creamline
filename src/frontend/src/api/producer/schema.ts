import z from "zod";
import i18n from "../../configs/i18n";

const ProducerBaseSchema = z.object({
	name: z
		.string()
		.max(255)
		.min(1, { message: i18n.t("add_producer.input_name_required") }),
	address: z
		.string()
		.min(1, { message: i18n.t("add_producer.input_address_required") })
		.max(100),
	contact_email: z
		.string()
		.max(256)
		.email({ message: i18n.t("add_producer.input_email_invalid") })
		.or(z.literal(""))
		.nullish(),
});

export const CreateUpdateProducerSchema = ProducerBaseSchema.extend({
	uuid: z.string().uuid().optional(),
});

export const GetProducerSchema = ProducerBaseSchema.extend({
	uuid: z.string().uuid(),
}).passthrough();
