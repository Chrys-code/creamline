import { z } from "zod";
import { tTyped } from "../../../../configs/i18n";

const tAuth = tTyped("auth");

const LoginFormSchema = z.object({
	email: z.string().email({ message: tAuth("login.errors.email") }),
	password: z.string().min(1, { message: tAuth("login.errors.password") }),
	detail: z.string().optional(),
});

const RoleSchema = z.object({
	groups: z.string().array(),
	permissions: z.string().array(),
});

const schemas = {
	LoginFormSchema,
	RoleSchema,
};

export default schemas;
