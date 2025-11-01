import z from "zod";

export const ProductDefinitionTypeEnum = z.enum(["CREAM", "WHOLE MILK", "SKIMMED MILK"]);

const BaseProductDefinitionSchema = z.object({
	name: z.string().max(255),
	type: ProductDefinitionTypeEnum,
});

export const ProductDefinitionSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid(),
});

export const CreateProductDefinitionSchema = BaseProductDefinitionSchema;

export const PatchProductDefinitionSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid(),
}).partial();
