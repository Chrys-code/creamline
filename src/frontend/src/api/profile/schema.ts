import z from "zod";

const ProfileSchema = z
	.object({
		uuid: z.string().uuid(),
		email: z.string().max(255).email(),
		profile_image: z.string().max(256).nullish(),
		first_name: z.string().max(100).optional(),
		last_name: z.string().max(100).optional(),
	})
	.passthrough();

const PatchedProfileSchema = z
	.object({
		profile_image: z.string().max(256).nullable(),
		first_name: z.string().max(100),
		last_name: z.string().max(100),
	})
	.partial()
	.passthrough();

export { ProfileSchema, PatchedProfileSchema };
