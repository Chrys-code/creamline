import { z } from "zod";
import i18n from "../../../../configs/i18n";

const LoginSchema = z
	.object({
		email: z.string().email({ message: i18n.t("login.input_email_invalid") }),
		password: z.string().min(1, { message: i18n.t("login.input_password_required") }),
	})
	.passthrough();

export default LoginSchema;
