import { z } from "zod";

const UserGroupBaseSchema = z.object({
	uuid: z.string().uuid(),
	name: z.string(),
});

const schemas = {
	UserGroupBaseSchema,
};

export default schemas;
