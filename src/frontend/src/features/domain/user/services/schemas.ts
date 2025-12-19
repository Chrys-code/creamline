import z from "zod";

import { tTyped } from "@/configs/i18n";

const tCommon = tTyped("common");

const UserProfileSchema = z.object({
	// profile_image: z.string().max(256).nullable(),
	first_name: z
		.string()
		.min(1, { message: tCommon("errors.input_is_required") })
		.max(100, { message: tCommon("errors.input_length_lte") }),
	last_name: z
		.string()
		.min(1, { message: tCommon("errors.input_is_required") })
		.max(100, { message: tCommon("errors.input_length_lte") }),
});

const BaseUserSchema = z.object({
	uuid: z.string().uuid().optional(),
	email: z
		.string()
		.max(255, { message: tCommon("errors.input_length_lte") })
		.email(),
	groups: z.array(z.string()),
	is_active: z.boolean().optional(),
	is_staff: z.boolean().nullish(),
	profile: UserProfileSchema,
	password: z.string().optional(),
});

const UserSchema = BaseUserSchema.extend({
	uuid: z.string().uuid(),
});

const ListUserSchema = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(UserSchema),
	})
	.passthrough();

const UserFormSchema = BaseUserSchema;
const CreateUserFormSchema = BaseUserSchema;
const PatchUserFormSchema = BaseUserSchema.partial();

const schemas = {
	UserSchema,
	ListUserSchema,
	UserFormSchema,
	CreateUserFormSchema,
	PatchUserFormSchema,
};

export default schemas;
