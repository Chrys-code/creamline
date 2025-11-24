import { z } from "zod";

const BaseStorageTypeSchema = z.object({
	uuid: z.string().uuid(),
	name: z.string(),
});

const schemas = {
	BaseStorageTypeSchema,
};

export default schemas;
