import type { ProductDefinition } from "../types";

export const adaptProductDefinitionsToProductDefinitionOptions = (
	productDefinitions: ProductDefinition[]
) =>
	productDefinitions?.map((productDefinition) => ({
		id: productDefinition.uuid,
		value: productDefinition.name,
	})) || [];
