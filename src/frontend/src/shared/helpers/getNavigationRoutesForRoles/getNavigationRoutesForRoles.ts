import type { NAVIGATION_ROUTES } from "@/configs/navigation";
import type { NAVIGATION_ROUTE } from "../../types";

interface GetRoutesForRolesProps {
	routes: typeof NAVIGATION_ROUTES;
	userGroups: string[];
	ignoredRoutes: string[];
	ignoredRouteKeys?: string[];
}

/**
 * Used to get available links to routes depending on user's user groups.
 * Gets a subset of routes of NAVIGATION_ROUTES depending on user's user groups.
 * @param routes NAVIGATION_ROUTES, Navigation routes object
 * @param userGroups User's user groups. e.g Manager
 * @param ignoredRoutes Route root segments to be ignored from "routes". E.g: Use this to exclude everything in the "user" route.
 * @param ignoredRouteKeys Ignores route keys such as "root", "list", "create", "edit",
 * @returns Subset of NAVIGATION_ROUTES as object
 */
export const getRoutesForRoles = ({
	routes,
	userGroups = [],
	ignoredRoutes = [],
	ignoredRouteKeys = [],
}: GetRoutesForRolesProps): Record<string, NAVIGATION_ROUTE> => {
	const result: Record<string, NAVIGATION_ROUTE> = {};

	for (const key in routes) {
		// @ts-expect-error cannot use string as key
		const route: NAVIGATION_ROUTE = routes[key];

		// If route is ignored, continue iterating
		if (ignoredRoutes.includes(key)) continue;

		// Duplicate route segment for mutation
		const filteredRouteSegment = { ...route };

		// Iterate over sub routes ("root", "list", "create", "edit") in route segment
		for (const subKey in filteredRouteSegment) {
			// If route is a top level route without subroutes ignore
			if (["path", "title", "requiredRoles"].includes(subKey)) continue;

			// If ignored, delete and continue
			if (ignoredRouteKeys.includes(subKey)) {
				delete filteredRouteSegment[subKey];
				continue;
			}

			const userIsNotInAllowedGroups = !filteredRouteSegment[subKey].requiredRoles?.some(
				(role: string) => userGroups.includes(role)
			);

			// If route has requiredRoles and User has no matching role;
			// remove and continue iterating
			if (userIsNotInAllowedGroups) {
				delete filteredRouteSegment[subKey];
				continue;
			}
		}

		// If routeSegment is left without path or subRoutes; skip
		if (!Object.keys(filteredRouteSegment).length) {
			continue;
		}

		result[key] = filteredRouteSegment;
	}

	return result;
};
