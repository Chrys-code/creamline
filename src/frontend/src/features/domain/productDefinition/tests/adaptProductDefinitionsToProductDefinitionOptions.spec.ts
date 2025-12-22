import type { ProductDefinitionOptions } from "../types";

import { describe, it, expect } from "vitest";
import { adaptProductDefinitionsOptionsToProductDefinitionOptions } from "../adapters/productDefinitionAdapters";

describe("adaptProductDefinitionsOptionsToProductDefinitionOptions", () => {
	it("should return empty array if args missing", () => {
		const productDefinition = undefined;

		const adaptedProductDefinition =
			// @ts-expect-error argument should be type of array
			adaptProductDefinitionsOptionsToProductDefinitionOptions(productDefinition);

		expect(adaptedProductDefinition).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const productDefinition = null;

		const adaptedProductDefinition =
			// @ts-expect-error argument should be type of array
			adaptProductDefinitionsOptionsToProductDefinitionOptions(productDefinition);

		expect(adaptedProductDefinition).toEqual([]);
	});

	it("should return adapted array", () => {
		const productDefinition: ProductDefinitionOptions[] = [
			{
				label: "Cream",
				value: "test-uuid",
			},
			{
				label: "Whole milk",
				value: "test-uuid-2",
			},
		];

		const adaptedProductDefinition =
			adaptProductDefinitionsOptionsToProductDefinitionOptions(productDefinition);

		const expectedAdaptedProductDefinition = [
			{ id: "test-uuid", value: "Cream" },
			{ id: "test-uuid-2", value: "Whole milk" },
		];

		expect(adaptedProductDefinition).toEqual(expectedAdaptedProductDefinition);
	});
});
