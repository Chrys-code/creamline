import { z } from "zod";

const BasePasteurSchema = z.object({
	name: z.string().max(255),
});

const PasteurSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
});

const CreatePasteurFormSchema = BasePasteurSchema;

const PatchPasteurFormSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	PasteurSchema,
	CreatePasteurFormSchema,
	PatchPasteurFormSchema,
};

export default schemas;
