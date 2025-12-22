import type { Storage } from "../types";

import { describe, it, expect } from "vitest";
import { adaptStoragesToStorageOptions } from "../adapters/storageAdapters";

describe("adaptStoragesToStorageOptions", () => {
	it("should return empty array if args missing", () => {
		const storage = undefined;

		const adaptedStorage =
			// @ts-expect-error argument should be type of array
			adaptStoragesToStorageOptions(storage);

		expect(adaptedStorage).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const storage = null;

		const adaptedStorage =
			// @ts-expect-error argument should be type of array
			adaptStoragesToStorageOptions(storage);

		expect(adaptedStorage).toEqual([]);
	});

	it("should return adapted array", () => {
		const storage: Storage[] = [
			{
				name: "Storage 1",
				uuid: "test-uuid",
				type: "123-uuid-wrgfh",
				type_label: "Silo",
				created_at: "2025.11.06",
				updated_at: "2025.11.06",
			},
			{
				name: "Storage 2",
				uuid: "test-uuid-2",
				type: "123-uuid-wrgfh",
				type_label: "Silo",
				created_at: "2025.11.06",
				updated_at: "2025.11.06",
			},
		];

		const adaptedStorage = adaptStoragesToStorageOptions(storage);

		const expectedAdaptedStorage = [
			{ id: "test-uuid", value: "Storage 1" },
			{ id: "test-uuid-2", value: "Storage 2" },
		];

		expect(adaptedStorage).toEqual(expectedAdaptedStorage);
	});
});
