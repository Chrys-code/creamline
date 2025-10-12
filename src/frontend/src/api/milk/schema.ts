import z from "zod";
import i18n from "../../configs/i18n";
import { StorageTypeEnum } from "../storage/schema";

const MilkBaseSchema = z.object({
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
});

export const CreateUpdateMilkSchema = MilkBaseSchema.extend({
	uuid: z.string().uuid().optional(),
});

export const GetMilkSchema = MilkBaseSchema.extend({
	uuid: z.string().uuid(),
	producer_uuid: z.string().uuid(),
	producer_name: z.string(),

	storage_uuid: z.string().uuid(),
	storage_name: z.string(),
	storage_type: StorageTypeEnum,

	created_at: z.string(),
	updated_at: z.string(),
	deleted_at: z.string().nullish(),
}).passthrough();

export const PaginatedMilkListSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(GetMilkSchema),
	})
	.passthrough();
