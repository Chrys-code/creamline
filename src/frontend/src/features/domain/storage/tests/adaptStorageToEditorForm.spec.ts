import type { Storage } from "../types";

import { describe, it, expect } from "vitest";
import { adaptStorageToEditorForm } from "../adapters/storageAdapters";

describe("adaptStorageToEditorForm", () => {
	it("should return null if args missing", () => {
		const storage = undefined;

		const adaptedStorage =
			// @ts-expect-error argument should be type of Storage or Null
			adaptStorageToEditorForm(storage);

		expect(adaptedStorage).toEqual(null);
	});

	it("should return null if args is null", () => {
		const storage = null;

		const adaptedStorage = adaptStorageToEditorForm(storage);

		expect(adaptedStorage).toEqual(null);
	});

	it("should return adapted array", () => {
		const storage: Storage = {
			name: "Storage 1",
			uuid: "test-uuid",
			type: "123-uuid-wrgfh",
			type_label: "Silo",
			created_at: "2025.11.06",
			updated_at: "2025.11.06",
		};

		const adaptedStorage = adaptStorageToEditorForm(storage);

		const expectedAdaptedStorage = {
			name: "Storage 1",
			uuid: "test-uuid",
			type: "123-uuid-wrgfh",
			created_at: "2025.11.06",
			updated_at: "2025.11.06",
		};

		expect(adaptedStorage).toEqual(expectedAdaptedStorage);
	});
});
