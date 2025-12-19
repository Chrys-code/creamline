import type z from "zod";
import type schemas from "../services/schemas";

export type LoginFormSchema = z.infer<typeof schemas.LoginFormSchema>;
