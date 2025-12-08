import type z from "zod";
import type schemas from "../services/schemas";

export type Pasteurisation = z.infer<typeof schemas.Pasteurisation>;
export type PaginatedPasteurisationListSchema = z.infer<
	typeof schemas.PaginatedPasteurisationListSchema
>;

export type CreatePasteurisationFormSchema = z.infer<typeof schemas.CreatePasteurisationFormSchema>;
export type PatchPasteurisationFormSchema = z.infer<typeof schemas.PatchPasteurisationFormSchema>;

export type PasteurisationSummary = z.infer<typeof schemas.PasteurisationSummarySchema>;

import pasterisationTranslations from "../i18n";
export type PasterisationTranslations = typeof pasterisationTranslations.en;
