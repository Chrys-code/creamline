import type z from "zod";
import type schemas from "../services/pasteurSchemas";

export type Pasteur = z.infer<typeof schemas.PasteurSchema>;
export type PaginatedPasteurList = z.infer<typeof schemas.PaginatedListPasteurSchema>;

export type PasteurFormSchema = z.infer<typeof schemas.PasteurFormSchema>;
export type CreatePasteurFormSchema = z.infer<typeof schemas.CreatePasteurFormSchema>;
export type UpdatePasteurFormSchema = z.infer<typeof schemas.PatchPasteurFormSchema>;

import pasteurTranslations from "../i18n";
export type PasteurTranslations = typeof pasteurTranslations.en;
