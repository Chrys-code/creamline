import type z from "zod";
import type schemas from "../services/profileSchemas";

export type Profile = z.infer<typeof schemas.ProfileSchema>;
export type PatchProfileFormSchema = z.infer<typeof schemas.PatchProfileFormSchema>;

import profileTranslations from "../i18n";
export type ProfileTranslations = typeof profileTranslations.en;
