import type z from "zod";
import type schemas from "../services/schemas";

export type Producer = z.infer<typeof schemas.ProducerSchema>;
export type PaginatedProducerList = z.infer<typeof schemas.PaginatedListProducerSchema>;

export type ProducerFormSchema = z.infer<typeof schemas.ProducerFromSchema>;
export type CreateProducerFormSchema = z.infer<typeof schemas.CreateProducerFormSchema>;
export type UpdateProducerFormSchema = z.infer<typeof schemas.PatchProducerFormSchema>;

import producerTranslations from "../i18n";
export type ProducerTranslations = typeof producerTranslations.en;
