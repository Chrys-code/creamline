import { z } from "zod";

const SignupSchema = z
	.object({ email: z.string().max(255).email(), password: z.string().min(8) })
	.passthrough();

export default SignupSchema;
