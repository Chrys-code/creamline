import z from "zod";
import i18n from "../../configs/i18n";

const ProducerSchema = z
	.object({
		uuid: z.string().uuid().optional(),
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
	})
	.passthrough();

export default ProducerSchema;
