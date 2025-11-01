import { redirect } from "react-router";
import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requireAuth = async () => {
	try {
		await api.get("/api/session/");
		const profileResponse = await api.get("/api/v1/profile/");
		const roles = await api.get("/api/roles/");
		const parsed = schemas.ProfileSchema.parse(profileResponse);
		return { ...parsed, roles };
	} catch {
		throw redirect("/login");
	}
};

export default requireAuth;
