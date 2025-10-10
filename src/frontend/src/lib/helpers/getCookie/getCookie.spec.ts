import { describe, it, expect } from "vitest";
import { getCookie } from "./getCookie";

describe("getCookie", () => {
	it("should return empty string when cookies are null", () => {
		// @ts-expect-error cookies should be string
		const cookie = getCookie({ name: "sessionid", cookies: null });
		expect(cookie).toBe("");
	});

	it("should return empty string when cookies are undefined", () => {
		// @ts-expect-error cookies should be string
		const cookie = getCookie({ name: "sessionid", cookies: null });
		expect(cookie).toBe("");
	});

	it("should return empty string when cookies are not string type", () => {
		// @ts-expect-error cookies should be string
		const cookie = getCookie({ name: "sessionid", cookies: 9 });
		expect(cookie).toBe("");
	});

	it("should return empty string when cookies are empty string", () => {
		const cookie = getCookie({ name: "sessionid", cookies: "" });
		expect(cookie).toBe("");
	});

	it("should return empty string when no cookie found", () => {
		const cookieString = "csrftoken=4325ytgf; somethingelse=rw4564uhgdfg";
		const cookie = getCookie({ name: "sessionid", cookies: cookieString });
		expect(cookie).toBe("");
	});

	it("should cookie value when cookie found", () => {
		const cookieString = "csrftoken=4325ytgf; sessionid=345ytrsdf; somethingelse=rw4564uhgdfg";
		const cookie = getCookie({ name: "sessionid", cookies: cookieString });
		expect(cookie).toBe("345ytrsdf");
	});
});
