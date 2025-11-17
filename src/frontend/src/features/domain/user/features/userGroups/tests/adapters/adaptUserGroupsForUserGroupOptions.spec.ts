import { describe, it, expect } from "vitest";

import { adaptUserGroupsForUserGroupOptions } from "../../adapters/index";

describe("adaptUserGroupsForOptions", () => {
	const userGroupsResponse = [
		{ id: 1, name: "Manager" },
		{ id: 2, name: "Milk-Collector" },
		{ id: 3, name: "Pasteuriser" },
	];

	it("should return empty list if input is undefined", () => {
		// @ts-expect-error accepts array
		const value = adaptUserGroupsForUserGroupOptions(undefined);
		expect(value).toStrictEqual([]);
	});

	it("should return empty list if input is null", () => {
		// @ts-expect-error accepts array
		const value = adaptUserGroupsForUserGroupOptions(null);
		expect(value).toStrictEqual([]);
	});

	it("should return empty list if input is not an array but has length", () => {
		// @ts-expect-error accepts array
		const value = adaptUserGroupsForUserGroupOptions("test input");
		expect(value).toStrictEqual([]);
	});

	it("should return the correct format", () => {
		const correctFormat = [
			{ id: 1, value: "Manager" },
			{ id: 2, value: "Milk-Collector" },
			{ id: 3, value: "Pasteuriser" },
		];

		const value = adaptUserGroupsForUserGroupOptions(userGroupsResponse);
		expect(value).toStrictEqual(correctFormat);
	});
});
