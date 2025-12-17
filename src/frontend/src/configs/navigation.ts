import { USER_GROUPS } from "./constants";
import { tTyped } from "./i18n";

const tNavigation = tTyped("navigation");

export const NAVIGATION_ROUTES = {
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
			title: tNavigation("sidebar.users"),
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
			title: tNavigation("sidebar.processes.milk_collection.milk_collection"),
		},
		list: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
			path: "/milk-collection/list",
			title: tNavigation("sidebar.processes.milk_collection.milk_collection_list"),
		},
		create: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
			path: "/milk-collection/create",
			title: tNavigation("sidebar.processes.milk_collection.milk_collection_create"),
		},
		edit: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
			path: "/milk-collection/edit/",
		},
	},
	pasteuriation: {
		root: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/pasteurisation",
			title: tNavigation("sidebar.processes.pasteurisation.pasteurisation"),
		},
		list: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.PASTEURISER],
			path: "/pasteurisation/list",
			title: tNavigation("sidebar.processes.pasteurisation.pasteurisation_list"),
		},
		create: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.PASTEURISER],
			path: "/pasteurisation/create",
			title: tNavigation("sidebar.processes.pasteurisation.pasteurisation_create"),
		},
		edit: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.PASTEURISER],
			path: "/pasteurisation/edit/",
		},
	},
	producer: {
		list: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
			path: "/producers",
			title: tNavigation("sidebar.utilities.producer"),
		},
		create: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
			path: "/producer/create",
		},
		edit: {
			requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
			path: "/producer/edit/",
		},
	},
	storage: {
		list: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/storages",
			title: tNavigation("sidebar.utilities.storage"),
		},
		create: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/storage/create",
		},
		edit: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/storage/edit/",
		},
	},
	pasteur: {
		list: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/pasteurs",
			title: tNavigation("sidebar.utilities.pasteur"),
		},
		create: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/pasteur/create",
		},
		edit: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/pasteur/edit/",
		},
	},
	productDefinition: {
		list: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/product-definitions",
			title: tNavigation("sidebar.utilities.product_definitions"),
		},
		create: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/product-definition/create",
		},
		edit: {
			requiredRoles: [USER_GROUPS.MANAGER],
			path: "/product-definition/edit/",
		},
	},
};
