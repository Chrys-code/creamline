import z from "zod";
import i18n from "../../configs/i18n";

const MilkSchema = z
	.object({
		producer: z.string().uuid({ message: i18n.t("common_validation.input_select_required") }),
		storage: z.string().uuid({ message: i18n.t("common_validation.input_select_required") }),
		volume_kg: z.number().gte(1, { message: i18n.t("common_validation.input_gte_0") }),
		volume_liters: z.number().gte(1, { message: i18n.t("common_validation.input_gte_0") }),
		acid_content: z.number().gte(0).optional(),
		inhibitory_residue: z.coerce.boolean().optional(),
		aflatoxin: z.coerce.boolean().optional(),
		temperature: z
			.number()
			.gte(-273.15, {
				message: i18n.t("common_validation.input_gte_absolute_zero"),
			})
			.optional(),
	})
	.passthrough();

export default MilkSchema;
