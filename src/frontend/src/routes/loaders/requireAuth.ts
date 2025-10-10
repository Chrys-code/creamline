import { redirect } from "react-router";
import { api } from "../../api/axios";

export interface RequireAuthData {
	uuid: string;
	email: string;
	profile_image: string;
	first_name: string;
	last_name: string;
}

const requireAuth = async (): Promise<Response | RequireAuthData> => {
	try {
		await api.get("/api/session/");
		const profileResponse = await api.get("/api/v1/profile/");
		const profileData = profileResponse;
		return profileData;
	} catch {
		throw redirect("/login");
	}
};

export default requireAuth;
