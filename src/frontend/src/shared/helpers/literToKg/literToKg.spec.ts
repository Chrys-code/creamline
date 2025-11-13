import { describe, it, expect } from "vitest";
import convertMilkLiterAndKg from "./literToKg";

describe("convertMilkLiterAndKg", () => {
	it("should return 0 if liter and kg is undefined", () => {
		const volume = convertMilkLiterAndKg({ liters: undefined, kg: undefined });
		expect(volume).toBe("0");
	});
	it("should return 0 if liter and kg is null", () => {
		// @ts-expect-error both arguments should be number or undefined
		const volume = convertMilkLiterAndKg({ liters: null, kg: null });
		expect(volume).toBe("0");
	});

	it("should return kg volume when liter is provided", () => {
		const volume = convertMilkLiterAndKg({ liters: 100, kg: undefined });
		expect(volume).toBe("103.00");
	});

	it("should return liter volume when kg is provided", () => {
		const volume = convertMilkLiterAndKg({ liters: undefined, kg: 100 });
		expect(volume).toBe("97.09");
	});
});
