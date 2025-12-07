/**
 * Returns the value of a cookie from document.cookies
 * @param name Cookie name
 * @param cookies document.cookies
 * @returns Found cookie's value or empty string if not found.
 */
export function getCookie({ name, cookies }: { name: string; cookies: string }) {
	if (!cookies) return "";
	if (typeof cookies !== "string") return "";

	const value = `; ${cookies}`;
	const parts = value.split("; ");

	const cookieByName = parts.find((cookie) => cookie.includes(name));
	if (!cookieByName) return "";

	return cookieByName?.split("=")[1];
}
