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
	email: z.string().max(255).email(),
	uuid: z.string().uuid(),
});

const PatchProfileFormSchema = z
	.object({
		profile_image: z.string().max(256).nullable(),
		first_name: z.string().max(100),
		last_name: z.string().max(100),
	})
	.partial();

const ProfilePreviewSchema = z.object({
	profile_image: z.string().nullable(),
	first_name: z.string(),
	last_name: z.string(),
});

const schemas = {
	ProfileSchema,
	PatchProfileFormSchema,
	ProfilePreviewSchema,
};

export default schemas;
