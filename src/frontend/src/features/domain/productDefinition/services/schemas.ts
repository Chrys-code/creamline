import z from "zod";

const BaseProductDefinitionSchema = z.object({
	name: z.string().max(255),
	type: z.string(),
});

const ProductDefinitionSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid(),
});

const CreateProductDefinitionFormSchema = BaseProductDefinitionSchema;

const PatchProductDefinitionFormSchema = BaseProductDefinitionSchema.extend({
	uuid: z.string().uuid(),
}).partial();

const schemas = {
	ProductDefinitionSchema,
	CreateProductDefinitionFormSchema,
	PatchProductDefinitionFormSchema,
};

export default schemas;
