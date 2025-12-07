import type { ProductDefinition } from "../types";

import { describe, it, expect } from "vitest";
import { adaptProductDefinitionsToProductDefinitionOptions } from "../adapters";

describe("adaptProductDefinitionsToProductDefinitionOptions", () => {
	it("should return empty array if args missing", () => {
		const productDefinition = undefined;

		const adaptedProductDefinition =
			// @ts-expect-error argument should be type of array
			adaptProductDefinitionsToProductDefinitionOptions(productDefinition);

		expect(adaptedProductDefinition).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const productDefinition = null;

		const adaptedProductDefinition =
			// @ts-expect-error argument should be type of array
			adaptProductDefinitionsToProductDefinitionOptions(productDefinition);

		expect(adaptedProductDefinition).toEqual([]);
	});

	it("should return adapted array", () => {
		const productDefinition: ProductDefinition[] = [
			{
				name: "Test product definition",
				type: "1233-dfgfhjj-5464",
				uuid: "test-uuid",
				type_label: "CREAM",
			},
			{
				name: "Test product definition 2",
				type: "1233-dfgfhjj-54642",
				uuid: "test-uuid-2",
				type_label: "CREAM",
			},
		];

		const adaptedProductDefinition =
			adaptProductDefinitionsToProductDefinitionOptions(productDefinition);

		const expectedAdaptedProductDefinition = [
			{ id: "test-uuid", value: "Test product definition" },
			{ id: "test-uuid-2", value: "Test product definition 2" },
		];

		expect(adaptedProductDefinition).toEqual(expectedAdaptedProductDefinition);
	});
});
