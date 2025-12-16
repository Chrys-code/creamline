import type { NAVIGATION_ROUTES } from "../../../configs/navigation";
import type { NAVIGATION_ROUTE } from "../../types";

interface GetRoutesForRolesProps {
	routes: typeof NAVIGATION_ROUTES;
	userGroups: string[];
	ignoredRoutes: string[];
}

export const getRoutesForRoles = ({
	routes,
	userGroups = [],
	ignoredRoutes,
}: GetRoutesForRolesProps) => {
	const requiredRouteKeys = ["root", "list", "create"];
	const result: Record<string, NAVIGATION_ROUTE> = {};

	for (const key in routes) {
		// @ts-expect-error cannot use string as key
		const route: NAVIGATION_ROUTE = routes[key];

		// If route has requiredRoles and User has no matching role; skip route
		if (
			ignoredRoutes.includes(key) ||
			(route.requiredRoles &&
				!route.requiredRoles.some((role: string) => userGroups.includes(role)))
		) {
			continue;
		}

		// Duplicate route for mutation
		const filteredRoute = { ...route };

		// Delete keys that are not in requiredRouteKeys
		for (const subKey in route) {
			if (!requiredRouteKeys.includes(subKey)) delete filteredRoute[subKey];
		}

		result[key] = filteredRoute;
	}

	return result;
};
