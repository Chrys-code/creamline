import z from "zod";
import { tTyped } from "../../../../configs/i18n";

const tCommon = tTyped("common");

const BasePasteurisationSchema = z.object({
	pasteur: z.string().uuid({ message: tCommon("errors.input_select_required") }),
	product_definition: z.string().uuid({ message: tCommon("errors.input_select_required") }),
	source_storage: z.string().uuid({ message: tCommon("errors.input_select_required") }),
	target_storage: z.string().uuid({ message: tCommon("errors.input_select_required") }),
	volume_kg: z
		.number({ message: tCommon("errors.input_is_required") })
		.gte(1, { message: tCommon("errors.input_gte_0") }),
	volume_liters: z
		.number({ message: tCommon("errors.input_is_required") })
		.gte(1, { message: tCommon("errors.input_gte_0") }),
	temperature: z.number({ message: tCommon("errors.input_is_required") }).gte(-273.15, {
		message: tCommon("errors.input_gte_absolute_zero"),
	}),
	// Preprocessor casts uknown to value causing TS error
	start_date: z.preprocess(
		(val): string => (typeof val === "string" ? new Date(val).toISOString() : (val as string)),
		z.string({ message: tCommon("errors.input_is_required") }).datetime({
			offset: true,
			message: tCommon("errors.input_gte_absolute_zero"),
		})
	),
	// Preprocessor casts uknown to value causing TS error
	end_date: z.preprocess(
		(val): string => (typeof val === "string" ? new Date(val).toISOString() : (val as string)),
		z.string({ message: tCommon("errors.input_is_required") }).datetime({
			offset: true,
			message: tCommon("errors.input_gte_absolute_zero"),
		})
	),
});

const Pasteurisation = BasePasteurisationSchema.extend({
	uuid: z.string().uuid(),
	pasteur_name: z.string(),
	product_definition_name: z.string(),
	source_storage_name: z.string(),
	target_storage_name: z.string(),

	created_at: z.string(),
	updated_at: z.string(),
	deleted_at: z.string().nullish(),
});

const PaginatedPasteurisationListSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(Pasteurisation),
	})
	.passthrough();

const PasteurisationSummarySchema = z.object({
	today_total: z.number(),
	today_change: z.number(),
	last_week_total: z.number(),
	last_week_change: z.number(),
	last_month_total: z.number(),
	last_month_change: z.number(),
});

const PasteurisationTimeSeriesSchema = z.object({
	date: z.string(), // ISO Date
	total_liters: z.number(),
});

const PasteurisationSegmentedByPasteurSchema = z.object({
	name: z.string(),
	value: z.number(),
});

const CreatePasteurisationFormSchema = BasePasteurisationSchema;

const PatchPasteurisationFormSchema = BasePasteurisationSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	Pasteurisation,
	PaginatedPasteurisationListSchema,
	CreatePasteurisationFormSchema,
	PatchPasteurisationFormSchema,
	PasteurisationSummarySchema,
	PasteurisationTimeSeriesSchema,
	PasteurisationSegmentedByPasteurSchema,
};

export default schemas;
