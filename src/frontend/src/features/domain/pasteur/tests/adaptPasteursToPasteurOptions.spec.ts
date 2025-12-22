import type { Pasteur } from "../types";

import { describe, it, expect } from "vitest";

import { adaptPasteursToPasteurOptions } from "../adapters/pasteur_adapters";

describe("adaptPasteursToPasteurOptions", () => {
	it("should return empty array if args missing", () => {
		const pasteur = undefined;

		const adaptedPasteur =
			// @ts-expect-error argument should be type of array
			adaptPasteursToPasteurOptions(pasteur);

		expect(adaptedPasteur).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const pasteur = null;

		const adaptedPasteur =
			// @ts-expect-error argument should be type of array
			adaptPasteursToPasteurOptions(pasteur);

		expect(adaptedPasteur).toEqual([]);
	});

	it("should return adapted array", () => {
		const pasteur: Pasteur[] = [
			{
				name: "Pasteur 1",
				uuid: "test-uuid",
			},
			{
				name: "Pasteur 2",
				uuid: "test-uuid-2",
			},
		];

		const adaptedPasteur = adaptPasteursToPasteurOptions(pasteur);

		const expectedAdaptedPasteur = [
			{ id: "test-uuid", value: "Pasteur 1" },
			{ id: "test-uuid-2", value: "Pasteur 2" },
		];

		expect(adaptedPasteur).toEqual(expectedAdaptedPasteur);
	});
});
