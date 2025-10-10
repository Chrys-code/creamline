import type { Profile } from "../../api/types";

import { redirect } from "react-router";
import { api } from "../../api/axios";

const requireAuth = async (): Promise<Response | Profile> => {
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
