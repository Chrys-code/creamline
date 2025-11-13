import type z from "zod";
import type schemas from "../services/schemas";

export type Pasteur = z.infer<typeof schemas.PasteurSchema>;
