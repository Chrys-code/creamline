import { describe, it, expect } from "vitest";

import { adaptUserGroupsForUserGroupOptions } from "../../adapters/userGroupAdapters";

describe("adaptUserGroupsForOptions", () => {
	const userGroupsResponse = [
		{ uuid: "234sdfd", name: "Manager" },
		{ uuid: "564fgh", name: "Milk-Collector" },
		{ uuid: "56456", name: "Pasteuriser" },
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
			{ id: "234sdfd", value: "Manager" },
			{ id: "564fgh", value: "Milk-Collector" },
			{ id: "56456", value: "Pasteuriser" },
		];

		const value = adaptUserGroupsForUserGroupOptions(userGroupsResponse);
		expect(value).toStrictEqual(correctFormat);
	});
});
