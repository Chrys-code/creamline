import z from "zod";

export const ProductDefinitionTypeEnum = z.enum(["CREAM", "WHOLE MILK", "SKIMMED MILK"]);

const BaseProductDefinitionSchema = z.object({
	name: z.string().max(255),
	type: ProductDefinitionTypeEnum,
});

export const CreateUpdateProductDefinitionSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid().optional(),
});

export const GetProductDefinitionSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid(),
});
