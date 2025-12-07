import type { MilkTrend } from "../types";

import { describe, it, expect } from "vitest";
import { adaptMilkTrendDateToLanguage } from "../adapters";
import i18n from "../../../../configs/i18n";

describe("adaptMilkTrendDateToLanguage", () => {
	it("should return empty array if args missing", () => {
		const milk = undefined;

		const adaptedMilk =
			// @ts-expect-error argument should be type of array
			adaptMilkTrendDateToLanguage(milk);

		expect(adaptedMilk).toEqual([]);
	});

	it("should return empty array if args is null", () => {
		const milk = null;

		const adaptedMilk =
			// @ts-expect-error argument should be type of array
			adaptMilkTrendDateToLanguage(milk);

		expect(adaptedMilk).toEqual([]);
	});

	it("should return adapted array with Hungarian date format in daily interval", () => {
		i18n.changeLanguage("hu");

		const milkTrend: MilkTrend[] = [
			{
				date: "2025-11-01T00:00:00Z",
				total_liters: 1000,
			},
			{
				date: "2025-11-02T00:00:00Z",
				total_liters: 2000,
			},
			{
				date: "2025-11-03T00:00:00Z",
				total_liters: 3000,
			},
		];

		const adaptedMilk = adaptMilkTrendDateToLanguage(milkTrend, "day");

		const expectedAdaptedMilk = [
			{
				date: "25. 11. 01.",
				total_liters: 1000,
			},
			{
				date: "25. 11. 02.",
				total_liters: 2000,
			},
			{
				date: "25. 11. 03.",
				total_liters: 3000,
			},
		];

		expect(adaptedMilk).toEqual(expectedAdaptedMilk);
	});

	it("should return adapted array with Hungarian date format in monthly interval", () => {
		i18n.changeLanguage("hu");

		const milkTrend: MilkTrend[] = [
			{
				date: "2025-11-01T00:00:00Z",
				total_liters: 1000,
			},
			{
				date: "2025-11-02T00:00:00Z",
				total_liters: 2000,
			},
			{
				date: "2025-11-03T00:00:00Z",
				total_liters: 3000,
			},
		];

		const adaptedMilk = adaptMilkTrendDateToLanguage(milkTrend, "month");

		const expectedAdaptedMilk = [
			{
				date: "25. 11.",
				total_liters: 1000,
			},
			{
				date: "25. 11.",
				total_liters: 2000,
			},
			{
				date: "25. 11.",
				total_liters: 3000,
			},
		];

		expect(adaptedMilk).toEqual(expectedAdaptedMilk);
	});

	it("should return adapted array with Hungarian date format in yearly interval", () => {
		i18n.changeLanguage("hu");

		const milkTrend: MilkTrend[] = [
			{
				date: "2025-11-01T00:00:00Z",
				total_liters: 1000,
			},
			{
				date: "2025-11-02T00:00:00Z",
				total_liters: 2000,
			},
			{
				date: "2025-11-03T00:00:00Z",
				total_liters: 3000,
			},
		];

		const adaptedMilk = adaptMilkTrendDateToLanguage(milkTrend, "year");

		const expectedAdaptedMilk = [
			{
				date: "25.",
				total_liters: 1000,
			},
			{
				date: "25.",
				total_liters: 2000,
			},
			{
				date: "25.",
				total_liters: 3000,
			},
		];

		expect(adaptedMilk).toEqual(expectedAdaptedMilk);
	});
	it("should return adapted array with English date format in daily interval", () => {
		i18n.changeLanguage("en");

		const milkTrend: MilkTrend[] = [
			{
				date: "2025-11-01T00:00:00Z",
				total_liters: 1000,
			},
			{
				date: "2025-11-02T00:00:00Z",
				total_liters: 2000,
			},
			{
				date: "2025-11-03T00:00:00Z",
				total_liters: 3000,
			},
		];

		const adaptedMilk = adaptMilkTrendDateToLanguage(milkTrend, "day");

		const expectedAdaptedMilk = [
			{
				date: "11/1/25",
				total_liters: 1000,
			},
			{
				date: "11/2/25",
				total_liters: 2000,
			},
			{
				date: "11/3/25",
				total_liters: 3000,
			},
		];

		expect(adaptedMilk).toEqual(expectedAdaptedMilk);
	});

	it("should return adapted array with English date format in monthly interval", () => {
		i18n.changeLanguage("en");

		const milkTrend: MilkTrend[] = [
			{
				date: "2025-11-01T00:00:00Z",
				total_liters: 1000,
			},
			{
				date: "2025-11-02T00:00:00Z",
				total_liters: 2000,
			},
			{
				date: "2025-11-03T00:00:00Z",
				total_liters: 3000,
			},
		];

		const adaptedMilk = adaptMilkTrendDateToLanguage(milkTrend, "month");

		const expectedAdaptedMilk = [
			{
				date: "11/25",
				total_liters: 1000,
			},
			{
				date: "11/25",
				total_liters: 2000,
			},
			{
				date: "11/25",
				total_liters: 3000,
			},
		];

		expect(adaptedMilk).toEqual(expectedAdaptedMilk);
	});

	it("should return adapted array with English date format in yearly interval", () => {
		i18n.changeLanguage("en");

		const milkTrend: MilkTrend[] = [
			{
				date: "2025-11-01T00:00:00Z",
				total_liters: 1000,
			},
			{
				date: "2025-11-02T00:00:00Z",
				total_liters: 2000,
			},
			{
				date: "2025-11-03T00:00:00Z",
				total_liters: 3000,
			},
		];

		const adaptedMilk = adaptMilkTrendDateToLanguage(milkTrend, "year");

		const expectedAdaptedMilk = [
			{
				date: "25",
				total_liters: 1000,
			},
			{
				date: "25",
				total_liters: 2000,
			},
			{
				date: "25",
				total_liters: 3000,
			},
		];

		expect(adaptedMilk).toEqual(expectedAdaptedMilk);
	});
});
