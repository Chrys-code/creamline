import { describe, it, expect } from "vitest";
import { getOffsetDate } from "./getDate";

describe("getOffsetDate", () => {
	it("should return current date if delta is not defined", () => {
		const offsetDate = getOffsetDate();

		const currentDateWithoutTimeData = new Date().toISOString().split("T")[0];

		expect(offsetDate).toBe(currentDateWithoutTimeData);
	});

	it("should return today if delta is not typeof number", () => {
		// @ts-expect-error getOffsetDate delta should be number
		const offsetDate = getOffsetDate("-1");

		const currentDateWithoutTimeData = new Date().toISOString().split("T")[0];

		expect(offsetDate).toBe(currentDateWithoutTimeData);
	});

	it("should return yesterday if delta is -1", () => {
		const delta = -1;

		const offsetDate = getOffsetDate(delta);

		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() + delta);
		const yesterdayWithoutTimeData = yesterday.toISOString().split("T")[0];

		expect(offsetDate).toBe(yesterdayWithoutTimeData);
	});

	it("should return tomorrow if delta is 1", () => {
		const delta = 1;

		const offsetDate = getOffsetDate(delta);

		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() + delta);
		const yesterdayWithoutTimeData = yesterday.toISOString().split("T")[0];

		expect(offsetDate).toBe(yesterdayWithoutTimeData);
	});

	it("should return the day 7 days from now if delta is 7", () => {
		const delta = 7;

		const offsetDate = getOffsetDate(delta);

		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() + delta);
		const yesterdayWithoutTimeData = yesterday.toISOString().split("T")[0];

		expect(offsetDate).toBe(yesterdayWithoutTimeData);
	});
});
