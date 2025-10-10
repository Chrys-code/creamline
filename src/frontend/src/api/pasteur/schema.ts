import { z } from "zod";

const PasteurSchema = z
	.object({
		uuid: z.string().uuid(),
		name: z.string().max(255),
	})
	.passthrough();

export default PasteurSchema;
