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
	producer_uuid: z.string().uuid(),
	producer_name: z.string(),

	storage_uuid: z.string().uuid(),
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

const schemas = {
	MilkSchema,
	PaginatedListMilkSchema,
	CreateMilkFormSchema,
	PatchMilkFormSchema,
};

export default schemas;
