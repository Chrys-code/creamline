import type z from "zod";
import type schemas from "../services/schemas";

export type Pasteur = z.infer<typeof schemas.PasteurSchema>;
export type PaginatedPasteurList = z.infer<typeof schemas.PaginatedListPasteurSchema>;

export type PasteurFormSchema = z.infer<typeof schemas.PasteurFormSchema>;
export type CreatePasteurFormSchema = z.infer<typeof schemas.CreatePasteurFormSchema>;
export type UpdatePasteurFormSchema = z.infer<typeof schemas.PatchPasteurFormSchema>;
