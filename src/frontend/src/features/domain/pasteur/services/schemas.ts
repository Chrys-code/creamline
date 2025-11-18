import { z } from "zod";
import { tTyped } from "../../../../configs/i18n";

const tCommon = tTyped("common");

const BasePasteurSchema = z.object({
	uuid: z.string().uuid().optional(),
	name: z.string({ message: tCommon("errors.input_is_required") }),
});

const PasteurSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
});

const ListPasteurSchema = z.array(PasteurSchema);

const PaginatedListPasteurSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(PasteurSchema),
	})
	.passthrough();

const CreatePasteurFormSchema = BasePasteurSchema;

const PatchPasteurFormSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	PasteurSchema,
	ListPasteurSchema,
	PaginatedListPasteurSchema,
	CreatePasteurFormSchema,
	PatchPasteurFormSchema,
};

export default schemas;
