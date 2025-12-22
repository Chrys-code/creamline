import type { StorageType } from "../types";

import { describe, it, expect } from "vitest";
import { adaptStorageTypesForStorageTypeOptions } from "../adapters/storageAdapters";

describe("adaptStorageTypesForStorageTypeOptions", () => {
	it("should return empty array if args missing", () => {
		const storage = undefined;

		const adaptedStorage =
			// @ts-expect-error argument should be type of array
			adaptStorageTypesForStorageTypeOptions(storage);

		expect(adaptedStorage).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const storage = null;

		const adaptedStorage =
			// @ts-expect-error argument should be type of array
			adaptStorageTypesForStorageTypeOptions(storage);

		expect(adaptedStorage).toEqual([]);
	});

	it("should return adapted array", () => {
		const storage: StorageType[] = [
			{
				label: "Storage 1",
				value: "test-uuid",
			},
			{
				label: "Storage 2",
				value: "test-uuid-2",
			},
		];

		const adaptedStorage = adaptStorageTypesForStorageTypeOptions(storage);

		const expectedAdaptedStorage = [
			{ id: "test-uuid", value: "Storage 1" },
			{ id: "test-uuid-2", value: "Storage 2" },
		];

		expect(adaptedStorage).toEqual(expectedAdaptedStorage);
	});
});
