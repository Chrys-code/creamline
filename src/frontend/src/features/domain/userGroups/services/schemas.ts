import { z } from "zod";

const UserGroupBaseSchema = z.object({
	id: z.number(),
	name: z.string(),
});

const schemas = {
	UserGroupBaseSchema,
};

export default schemas;
