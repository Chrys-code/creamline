import z from "zod";
import { tTyped } from "../../../../configs/i18n";

const tCommon = tTyped("common");

const MilkBaseSchema = z.object({
	producer: z.string().uuid({ message: tCommon("errors.input_select_required") }),
	storage: z.string().uuid({ message: tCommon("errors.input_select_required") }),
	volume_kg: z.number().gte(1, { message: tCommon("errors.input_gte_0") }),
	volume_liters: z.number().gte(1, { message: tCommon("errors.input_gte_0") }),
	acid_content: z.number().gte(0).optional(),
	inhibitory_residue: z.coerce.boolean().optional(),
	aflatoxin: z.coerce.boolean().optional(),
	temperature: z
		.number()
		.gte(-273.15, {
			message: tCommon("errors.input_gte_absolute_zero"),
		})
		.optional(),
});

const MilkSchema = MilkBaseSchema.extend({
	uuid: z.string().uuid(),

	producer_name: z.string(),
	storage_name: z.string(),

	created_at: z.string(),
	updated_at: z.string(),
	deleted_at: z.string().nullish(),
});

const PaginatedListMilkSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(MilkSchema),
	})
	.passthrough();

const CreateMilkFormSchema = MilkBaseSchema;

const PatchMilkFormSchema = MilkBaseSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const MilkSummarySchema = z.object({
	today_total: z.number(),
	today_change: z.number(),
	last_week_total: z.number(),
	last_week_change: z.number(),
	last_month_total: z.number(),
	last_month_change: z.number(),
});

const MilkTrendSchema = z.object({
	date: z.string(), // ISO date string
	total_liters: z.number(),
});

const MilkSegmentedByProducerSchema = z.object({
	name: z.string(),
	value: z.number(),
});

const schemas = {
	MilkSchema,
	PaginatedListMilkSchema,
	CreateMilkFormSchema,
	PatchMilkFormSchema,
	MilkSummarySchema,
	MilkTrendSchema,
	MilkSegmentedByProducerSchema,
};

export default schemas;
