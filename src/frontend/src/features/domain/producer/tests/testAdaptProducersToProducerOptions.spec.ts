import { describe, it, expect } from "vitest";

import type { Producer } from "../types";
import { adaptProducersToProducerOptions } from "../adapters";

describe("adaptProducersToProducerOptions", () => {
	it("should return empty array if args missing", () => {
		const producers = undefined;

		// @ts-expect-error argument should be type of array
		const adaptedProducers = adaptProducersToProducerOptions(producers);

		expect(adaptedProducers).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const producers = null;

		// @ts-expect-error argument should be type of array
		const adaptedProducers = adaptProducersToProducerOptions(producers);

		expect(adaptedProducers).toEqual([]);
	});

	it("should return adapted array", () => {
		const producers: Producer[] = [
			{
				name: "Test producer",
				address: "USA",
				uuid: "test-producer-uuid",
				created_at: "2025.11.05",
				updated_at: "2025.11.05",
				contact_email: null,
				deleted_at: null,
			},
			{
				name: "Test producer 2",
				address: "USA",
				uuid: "test-producer-uuid-2",
				created_at: "2025.11.05",
				updated_at: "2025.11.05",
				contact_email: null,
				deleted_at: null,
			},
		];

		const adaptedProducers = adaptProducersToProducerOptions(producers);

		const expectedAdaptedProducers = [
			{ id: "test-producer-uuid", value: "Test producer" },
			{ id: "test-producer-uuid-2", value: "Test producer 2" },
		];

		expect(adaptedProducers).toEqual(expectedAdaptedProducers);
	});
});
