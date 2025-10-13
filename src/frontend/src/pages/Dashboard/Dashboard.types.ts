import type { Profile } from "../../api/types";

export interface ProfileData extends Profile {
	roles: any;
}

export interface DashboardProps {
	profile: ProfileData;
}
