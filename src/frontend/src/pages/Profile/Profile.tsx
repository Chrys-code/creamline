import type React from "react";
import type { Profile } from "@/features/domain/user/features/profile/types";

import ProfileForm from "@/features/domain/user/features/profile/forms/profileForm";

import { useLoaderData } from "react-router";

const Profile: React.FC = () => {
	const profile = useLoaderData<Profile>();

	return <ProfileForm profile={profile} />;
};

export default Profile;
