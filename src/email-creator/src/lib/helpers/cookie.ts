export function getCookie(name: string) {
	const value = `; ${document.cookie}`
	const parts = value.split('; ')

	const cookieByName = parts.find(cookie => cookie.includes(name))

	if (!cookieByName) return ""

	return cookieByName?.split('=')[1]
}