import z from "zod";

const ProductDefinitionTypeEnum = z.enum(["CREAM", "WHOLE MILK", "SKIMMED MILK"]);

const ProductDefinitionSchema = z
	.object({
		uuid: z.string().uuid(),
		name: z.string().max(255),
		type: ProductDefinitionTypeEnum,
	})
	.passthrough();

export { ProductDefinitionSchema, ProductDefinitionTypeEnum };
