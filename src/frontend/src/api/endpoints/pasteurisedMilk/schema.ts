import z from "zod";
import i18n from "../../../configs/i18n";

const BasePasteurisedMilkSchema = z.object({
	pasteur: z.string().uuid({ message: i18n.t("common_validation.input_select_required") }),
	product_definition: z
		.string()
		.uuid({ message: i18n.t("common_validation.input_select_required") }),
	source_storage: z.string().uuid({ message: i18n.t("common_validation.input_select_required") }),
	target_storage: z.string().uuid({ message: i18n.t("common_validation.input_select_required") }),
	volume_kg: z
		.number({ message: i18n.t("common_validation.input_is_required") })
		.gte(1, { message: i18n.t("common_validation.input_gte_0") }),
	volume_liters: z
		.number({ message: i18n.t("common_validation.input_is_required") })
		.gte(1, { message: i18n.t("common_validation.input_gte_0") }),
	temperature: z.number({ message: i18n.t("common_validation.input_is_required") }).gte(-273.15, {
		message: i18n.t("common_validation.input_gte_absolute_zero"),
	}),
	// Preprocessor casts uknown to value causing TS error
	start_date: z.preprocess(
		(val): string => (typeof val === "string" ? new Date(val).toISOString() : (val as string)),
		z.string({ message: i18n.t("common_validation.input_is_required") }).datetime({
			offset: true,
			message: i18n.t("common_validation.input_gte_absolute_zero"),
		})
	),
	// Preprocessor casts uknown to value causing TS error
	end_date: z.preprocess(
		(val): string => (typeof val === "string" ? new Date(val).toISOString() : (val as string)),
		z.string({ message: i18n.t("common_validation.input_is_required") }).datetime({
			offset: true,
			message: i18n.t("common_validation.input_gte_absolute_zero"),
		})
	),
});

export const PasteurisedMilk = BasePasteurisedMilkSchema.extend({
	uuid: z.string().uuid(),
	pasteur_name: z.string(),
	product_definition_name: z.string(),
	source_storage_name: z.string(),
	target_storage_name: z.string(),

	created_at: z.string(),
	updated_at: z.string(),
	deleted_at: z.string().nullish(),
});

export const ListPasteurisedMilkSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(PasteurisedMilk),
	})
	.passthrough();

export const CreatePasteurisedMilkSchema = BasePasteurisedMilkSchema;

export const PatchPasteurisedMilkSchema = BasePasteurisedMilkSchema.extend({
	uuid: z.string().uuid(),
}).partial();
