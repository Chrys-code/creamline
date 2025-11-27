import type React from "react";
import type { Profile } from "../../features/domain/profile/types";

import ProfileForm from "../../features/domain/profile/forms/profileForm";

import { useLoaderData } from "react-router";

const Profile: React.FC = () => {
	const profile = useLoaderData<Profile>();

	return <ProfileForm profile={profile} />;
};

export default Profile;
