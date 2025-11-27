import type { ProductDefinition, ProductDefinitionOptions } from "../types";

export const adaptProductDefinitionsToProductDefinitionOptions = (
	productDefinitions: ProductDefinition[]
) =>
	productDefinitions?.map((productDefinition) => ({
		id: productDefinition.uuid,
		value: productDefinition.name,
	})) || [];

export const adaptProductDefinitionsOptionsToProductDefinitionOptions = (
	productDefinitionOptions: ProductDefinitionOptions[]
) =>
	productDefinitionOptions?.map((productDefinitionOption) => ({
		id: productDefinitionOption.value,
		value: productDefinitionOption.label,
	})) || [];
