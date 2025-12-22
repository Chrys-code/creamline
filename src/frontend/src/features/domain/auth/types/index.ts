import type z from "zod";
import type schemas from "../services/authSchemas";

export type LoginFormSchema = z.infer<typeof schemas.LoginFormSchema>;
