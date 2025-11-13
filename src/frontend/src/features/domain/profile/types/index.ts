import type z from "zod";
import type schemas from "../services/schemas";

export type Profile = z.infer<typeof schemas.ProfileSchema>;

export type PatchProfileFormSchema = z.infer<typeof schemas.PatchProfileFormSchema>;
