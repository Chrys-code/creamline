import { z } from "zod";

const BasePasteurSchema = z.object({
	name: z.string().max(255),
});

export const PasteurSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
});

export const ListPasteurSchema = z.object({
	count: z.number().int(),
	next: z.string().url().nullish(),
	previous: z.string().url().nullish(),
	results: z.array(PasteurSchema),
});

export const CreatePasteurSchema = BasePasteurSchema;

export const PatchPasteurSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
}).partial();
