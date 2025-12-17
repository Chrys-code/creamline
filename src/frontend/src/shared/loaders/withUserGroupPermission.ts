import { redirect, type LoaderFunctionArgs } from "react-router";
import { getProfile } from "../../features/domain/profile/loaders/getProfile";

/**
 * Used to run userGroup check before calling loaders in router.
 * Partial higher order function application; Currying.
 * The function checks if the user has allowed user groups. If not it redirects them to the dashboard.
 * If it passes returns the loaders to be executed.
 * @param loader Route loader
 * @param allowedGroups List of allowed groups for a route.
 * @returns Redicers or returns the loaders
 */
export const withUserGroupPermission =
	(loader: (_args: LoaderFunctionArgs) => Promise<any>, allowedGroups: string[]) =>
	async (args: LoaderFunctionArgs) => {
		const profile = await getProfile();
		if (!profile) throw redirect("/");

		if (!allowedGroups.some((group) => profile.groups.includes(group))) {
			throw redirect("/");
		}

		return loader(args);
	};
