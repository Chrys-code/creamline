import type z from "zod";
import type schemas from "../services/schemas";

export type ProductDefinition = z.infer<typeof schemas.ProductDefinitionSchema>;

export type CreateProductDefinitionFormSchema = z.infer<
	typeof schemas.CreateProductDefinitionFormSchema
>;
