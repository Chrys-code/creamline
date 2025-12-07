import type z from "zod";
import type schemas from "../services/schemas";
export type LoginFormSchema = z.infer<typeof schemas.LoginFormSchema>;

import authTranslations from "../i18n";
export type AuthTranslations = typeof authTranslations.en;
