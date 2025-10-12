import { redirect } from "react-router";
import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";

const requireAuth = async () => {
	try {
		await api.get("/api/session/");
		const profileResponse = await api.get("/api/v1/profile/");
		const parsed = schemas.ProfileSchema.parse(profileResponse);
		return parsed;
	} catch {
		throw redirect("/login");
	}
};

export default requireAuth;
