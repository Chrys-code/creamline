import { profileClient } from "../services/client";

export const getProfile = async () => {
	try {
		const profileResponse = await profileClient.getProfile();
		return profileResponse;
	} catch {
		throw new Error("Could not get profile");
	}
};
