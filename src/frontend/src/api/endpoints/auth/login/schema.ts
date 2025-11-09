import { z } from "zod";
import { tTyped } from "../../../../configs/i18n";

const tAuth = tTyped("auth");

const LoginSchema = z.object({
	email: z.string().email({ message: tAuth("login.errors.email") }),
	password: z.string().min(1, { message: tAuth("login.errors.password") }),
});

export default LoginSchema;
