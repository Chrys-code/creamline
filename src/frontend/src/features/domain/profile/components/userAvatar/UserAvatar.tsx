import type React from "react";
import type { UserAvatarProps } from "./UserAvatar.types";

import Avatar from "../../../../../shared/components/base/avatar";
import { useProfilePreview } from "../../hooks/useProfilePreview";

const UserAvatar: React.FC<UserAvatarProps> = ({ userId, width, height }: UserAvatarProps) => {
	const { data } = useProfilePreview(userId);

	let initials = undefined;

	if (data?.first_name && data.last_name) {
		initials =
			data?.first_name.substring(0, 1).toUpperCase() +
			data?.last_name.substring(0, 1).toUpperCase();
	}

	return (
		<>
			<Avatar
				width={width}
				height={height}
				initials={initials}
				imageUrl={data?.profile_image}
			/>
		</>
	);
};

export default UserAvatar;
