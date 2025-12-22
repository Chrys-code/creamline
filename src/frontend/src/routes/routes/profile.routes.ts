import type { RouteObject } from "react-router";
import { profileTranslationLoader } from "@/features/domain/user/features/profile/loaders/profileTranslation";
import { getProfile } from "@/features/domain/user/features/profile/loaders/getProfile";

const profileRoutes: RouteObject = {
	id: "profile",
	path: "/",
	loader: profileTranslationLoader,
	children: [
		{
			path: "profile",
			lazy: {
				Component: async () => (await import("@/pages/profile/Profile")).default,
			},
			loader: getProfile,
		},
	],
};

export default profileRoutes;
