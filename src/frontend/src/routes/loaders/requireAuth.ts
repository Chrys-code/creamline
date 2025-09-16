import { redirect } from "react-router";

import { session } from "../../api/auth";
import { getProfile } from "../../api/profile";

export interface RequireAuthData {
	uuid: string;
	email: string;
	profile_image: string;
	first_name: string;
	last_name: string;
}

const requireAuth = async (): Promise<Response | RequireAuthData> => {
	const getSessionResponse = await session();
	if (!getSessionResponse.ok) return redirect("/login");

	const getProfileResponse = await getProfile();
	if (!getProfileResponse.ok) {
		return redirect("/login")
	}

	const profileData: { uuid: string, email: string, profile_image: string, first_name: string, last_name: string } = await getProfileResponse.json();
	return profileData
}

export default requireAuth;