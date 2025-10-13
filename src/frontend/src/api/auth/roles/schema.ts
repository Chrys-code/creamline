import z from "zod";

export const RoleSchema = z.object({
	groups: z.string().array(),
	permissions: z.string().array(),
});
