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
	try {
		await session();
		const getProfileResponse = await getProfile();
		const profileResponseData = await getProfileResponse.response.json()
		const profileData: { uuid: string, email: string, profile_image: string, first_name: string, last_name: string } = profileResponseData;
		return profileData
	} catch {
		throw redirect("/login")
	}
}

export default requireAuth;