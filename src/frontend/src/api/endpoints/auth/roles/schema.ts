import z from "zod";

const RoleSchema = z.object({
	groups: z.string().array(),
	permissions: z.string().array(),
});

export default RoleSchema;
