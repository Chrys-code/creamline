import type z from "zod";
import type schemas from "../services/productDefinitionSchemas";

export type ProductDefinition = z.infer<typeof schemas.ProductDefinitionSchema>;
export type ListProductDefinition = z.infer<typeof schemas.ListProductDefinitionSchema>;
export type PaginatedListProductDefinition = z.infer<
	typeof schemas.PaginatedListProductDefinitionSchema
>;

export type ProductDefinitionFormSchema = z.infer<typeof schemas.ProductDefinitionFormSchema>;
export type CreateProductDefinitionFormSchema = z.infer<
	typeof schemas.CreateProductDefinitionFormSchema
>;
export type UpdateProductDefinitionFormSchema = z.infer<
	typeof schemas.PatchProductDefinitionFormSchema
>;

export type ProductDefinitionOptions = z.infer<typeof schemas.ProductDefinitionOptionsSchema>;

import productDefinitionTranslations from "../i18n";
export type ProductDefinitionTranslations = typeof productDefinitionTranslations.en;
