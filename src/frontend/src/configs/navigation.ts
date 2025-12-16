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
		requiredRoles: [USER_GROUPS.MANAGER],
		list: {
			path: "/users",
			title: tNavigation("sidebar.users"),
		},
		create: {
			path: "/user/create",
		},
		edit: {
			path: "/user/edit/",
		},
	},
	milkCollection: {
		requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
		root: {
			path: "/milk-collection",
			title: tNavigation("sidebar.processes.milk_collection.milk_collection"),
		},
		list: {
			path: "/milk-collection/list",
			title: tNavigation("sidebar.processes.milk_collection.milk_collection_list"),
		},
		create: {
			path: "/milk-collection/create",
			title: tNavigation("sidebar.processes.milk_collection.milk_collection_create"),
		},
		edit: {
			path: "/milk-collection/edit/",
		},
	},
	pasteuriation: {
		requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.PASTEURISER],
		root: {
			path: "/pasteurisation",
			title: tNavigation("sidebar.processes.pasteurisation.pasteurisation"),
		},
		list: {
			path: "/pasteurisation/list",
			title: tNavigation("sidebar.processes.pasteurisation.pasteurisation_list"),
		},
		create: {
			path: "/pasteurisation/create",
			title: tNavigation("sidebar.processes.pasteurisation.pasteurisation_create"),
		},
		edit: {
			path: "/pasteurisation/edit/",
		},
	},
	producer: {
		requiredRoles: [USER_GROUPS.MANAGER, USER_GROUPS.MILK_COLLECTOR],
		list: {
			path: "/producers",
			title: tNavigation("sidebar.utilities.producer"),
		},
		create: {
			path: "/producer/create",
		},
		edit: {
			path: "/producer/edit/",
		},
	},
	storage: {
		requiredRoles: [USER_GROUPS.MANAGER],
		list: {
			path: "/storages",
			title: tNavigation("sidebar.utilities.storage"),
		},
		create: {
			path: "/storage/create",
		},
		edit: {
			path: "/storage/edit/",
		},
	},
	pasteur: {
		requiredRoles: [USER_GROUPS.MANAGER],
		list: {
			path: "/pasteurs",
			title: tNavigation("sidebar.utilities.pasteur"),
		},
		create: {
			path: "/pasteur/create",
		},
		edit: {
			path: "/pasteur/edit/",
		},
	},
	productDefinition: {
		requiredRoles: [USER_GROUPS.MANAGER],
		list: {
			path: "/product-definitions",
			title: tNavigation("sidebar.utilities.product_definitions"),
		},
		create: {
			path: "/product-definition/create",
		},
		edit: {
			path: "/product-definition/edit/",
		},
	},
};
