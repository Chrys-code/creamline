import z from "zod";

const UseProfileSchema = z.object({
	// profile_image: z.string().max(256).nullable(),
	first_name: z.string().max(100),
	last_name: z.string().max(100),
});

const BaseUserSchema = z.object({
	email: z.string().max(255).email(),
	password: z.string(),
	groups: z.array(z.string()),
	is_active: z.boolean().optional(),
	is_staff: z.boolean(),
	profile: UseProfileSchema,
});

export const UserSchema = BaseUserSchema.extend({
	uuid: z.string().uuid(),
});

export const ListUserSchema = z.object({
	count: z.number().int(),
	next: z.string().url().nullish(),
	previous: z.string().url().nullish(),
	results: z.array(UserSchema),
});

export const CreateUserSchema = BaseUserSchema;

export const PatchUserSchema = BaseUserSchema.extend({
	uuid: z.string().uuid(),
}).partial();
