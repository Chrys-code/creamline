import z from "zod";

const BaseProfileSchema = z
	.object({
		profile_image: z.string().max(256).nullish(),
		first_name: z.string().max(100).optional(),
		last_name: z.string().max(100).optional(),
		groups: z.array(z.string()),
	})
	.passthrough();

const ProfileSchema = BaseProfileSchema.extend({
	email: z.string().max(255).email().nullish(),
	uuid: z.string().uuid(),
});

const PatchProfileFormSchema = z
	.object({
		profile_image: z.string().max(256).nullable(),
		first_name: z.string().max(100),
		last_name: z.string().max(100),
	})
	.partial();

const schemas = {
	ProfileSchema,
	PatchProfileFormSchema,
};

export default schemas;
