import { z } from "zod";

export const UserGroupBaseSchema = z.object({
	id: z.number(),
	name: z.string(),
});
