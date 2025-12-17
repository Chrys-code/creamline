import { describe, it, expect } from "vitest";
import { getRoutesForRoles } from "./getNavigationRoutesForRoles";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { USER_GROUPS } from "../../../configs/constants";

describe("getRoutesForRoles", () => {
	const mockRoutes = {
		app: {
			requiredRoles: null,
			path: "/",
			title: "Dashboard",
		},
		login: {
			requiredRoles: null,
			path: "/login",
		},
		profile: {
			requiredRoles: null,
			path: "/profile",
		},
		user: {
			list: {
				requiredRoles: [USER_GROUPS.MANAGER],
				path: "/users",
			},
			create: {
				requiredRoles: [USER_GROUPS.MANAGER],
				path: "/user/create",
			},
			edit: {
				requiredRoles: [USER_GROUPS.MANAGER],
				path: "/user/edit/",
			},
		},
		milkCollection: {
			root: {
				requiredRoles: [USER_GROUPS.MANAGER],
				path: "/milk-collection",
			},
			list: {
				requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
				path: "/milk-collection/list",
			},
			create: {
				requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
				path: "/milk-collection/create",
			},
			edit: {
				requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
				path: "/milk-collection/edit/",
			},
		},
	};

	it("should filter routes allowed to MILK_COLLECTOR without ignored paths", () => {
		const routes = getRoutesForRoles({
			routes: mockRoutes as typeof NAVIGATION_ROUTES,
			ignoredRoutes: [],
			ignoredRouteKeys: [],
			userGroups: [USER_GROUPS.MILK_COLLECTOR],
		});

		expect(routes).toEqual({
			app: {
				requiredRoles: null,
				path: "/",
				title: "Dashboard",
			},
			login: {
				requiredRoles: null,
				path: "/login",
			},
			profile: {
				requiredRoles: null,
				path: "/profile",
			},
			milkCollection: {
				list: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/list",
				},
				create: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/create",
				},
				edit: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/edit/",
				},
			},
		});
	});

	it("should filter routes allowed to MILK_COLLECTOR with ignored 'profile' path", () => {
		const routes = getRoutesForRoles({
			routes: mockRoutes as typeof NAVIGATION_ROUTES,
			ignoredRoutes: ["profile"],
			ignoredRouteKeys: [],
			userGroups: [USER_GROUPS.MILK_COLLECTOR],
		});

		expect(routes).toEqual({
			app: {
				requiredRoles: null,
				path: "/",
				title: "Dashboard",
			},
			login: {
				requiredRoles: null,
				path: "/login",
			},
			milkCollection: {
				list: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/list",
				},
				create: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/create",
				},
				edit: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/edit/",
				},
			},
		});
	});
	it("should filter routes allowed to MILK_COLLECTOR with ignored 'profile', 'milkCollection' paths", () => {
		const routes = getRoutesForRoles({
			routes: mockRoutes as typeof NAVIGATION_ROUTES,
			ignoredRoutes: ["profile", "milkCollection"],
			ignoredRouteKeys: [],
			userGroups: [USER_GROUPS.MILK_COLLECTOR],
		});

		expect(routes).toEqual({
			app: {
				requiredRoles: null,
				path: "/",
				title: "Dashboard",
			},
			login: {
				requiredRoles: null,
				path: "/login",
			},
		});
	});

	it("should filter routes allowed to MILK_COLLECTOR with ignore route 'edit' key", () => {
		const routes = getRoutesForRoles({
			routes: mockRoutes as typeof NAVIGATION_ROUTES,
			ignoredRoutes: [],
			ignoredRouteKeys: ["edit"],
			userGroups: [USER_GROUPS.MILK_COLLECTOR],
		});

		expect(routes).toEqual({
			app: {
				requiredRoles: null,
				path: "/",
				title: "Dashboard",
			},
			login: {
				requiredRoles: null,
				path: "/login",
			},
			profile: {
				requiredRoles: null,
				path: "/profile",
			},
			milkCollection: {
				list: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/list",
				},
				create: {
					requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
					path: "/milk-collection/create",
				},
			},
		});
	});

	it("should completely remove 'milkCollection' when its sub routes are empty but path is not ignored", () => {
		const routes = getRoutesForRoles({
			routes: mockRoutes as typeof NAVIGATION_ROUTES,
			ignoredRoutes: [],
			ignoredRouteKeys: ["list", "edit", "create"],
			userGroups: [USER_GROUPS.MILK_COLLECTOR],
		});

		expect(routes).toEqual({
			app: {
				requiredRoles: null,
				path: "/",
				title: "Dashboard",
			},
			login: {
				requiredRoles: null,
				path: "/login",
			},
			profile: {
				requiredRoles: null,
				path: "/profile",
			},
		});
	});
});
