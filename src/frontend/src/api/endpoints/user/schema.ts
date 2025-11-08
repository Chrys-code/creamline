import z from "zod";

const UserProfileSchema = z.object({
	// profile_image: z.string().max(256).nullable(),
	first_name: z.string().max(100),
	last_name: z.string().max(100),
});

export const BaseUserSchema = z.object({
	uuid: z.string().uuid().optional(),
	email: z.string().max(255).email(),
	groups: z.array(z.number()),
	is_active: z.boolean().optional(),
	is_staff: z.boolean().nullish(),
	profile: UserProfileSchema,
	password: z.string().optional(),
});

export const UserSchema = BaseUserSchema.extend({
	uuid: z.string().uuid(),
});

export const ListUserSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(UserSchema),
	})
	.passthrough();

export const UserFormSchema = BaseUserSchema;
export const CreateUserSchema = BaseUserSchema;
export const PatchUserSchema = BaseUserSchema.partial();
