import type { ProductDefinition, ProductDefinitionOptions } from "../types";

/**
 * Used to adapt Producers to generic dropdown options
 * @param productDefinitions ProductDefinitions array
 * @returns id, value pairs in array
 */
export const adaptProductDefinitionsToProductDefinitionOptions = (
	productDefinitions: ProductDefinition[]
) =>
	productDefinitions?.map((productDefinition) => ({
		id: productDefinition.uuid,
		value: productDefinition.name,
	})) || [];

/**
 * Used to adapt ProductDefinitionOptions to generic dropdown options
 * @param productDefinitions ProductDefinitionOptions array
 * @returns id, value pairs in array
 */
export const adaptProductDefinitionsOptionsToProductDefinitionOptions = (
	productDefinitionOptions: ProductDefinitionOptions[]
) =>
	productDefinitionOptions?.map((productDefinitionOption) => ({
		id: productDefinitionOption.value,
		value: productDefinitionOption.label,
	})) || [];
