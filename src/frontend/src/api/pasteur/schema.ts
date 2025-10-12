import { z } from "zod";

const BasePasteurSchema = z.object({
	name: z.string().max(255),
});

export const CreateUpdatePasteurSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid().optional(),
});

export const GetPasteurSchema = BasePasteurSchema.extend({
	uuid: z.string().uuid(),
}).passthrough();
