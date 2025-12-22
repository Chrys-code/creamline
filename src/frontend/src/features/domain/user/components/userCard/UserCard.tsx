import type { UserCardProps } from "./UserCard.types.ts";
import styles from "./UserCard.module.scss";

import UserAvatar from "../../features/profile/components/userAvatar";
import IconButton from "@/shared/components/base/iconButton";

import React from "react";

const MdOutlineRemoveRedEye = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineRemoveRedEye,
	}))
);

const MdOutlineCheckCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineCheckCircleOutline,
	}))
);

const MdBlock = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdBlock,
	}))
);

const UserCard: React.FC<UserCardProps> = ({
	name,
	userId,
	groups,
	isActive,
	onClick,
}: UserCardProps) => {
	const renderGroups = (groups: string[]) => {
		if (!groups || !groups.length) return null;
		return groups.join(" ");
	};

	return (
		<div className={styles.container}>
			<UserAvatar userId={userId} width={"2.5rem"} height={"2.5rem"} />
			<div className={styles.content}>
				<p>{name}</p>
				<p>{renderGroups(groups)}</p>
			</div>
			<div className={styles.actionsWrapper}>
				{isActive ? (
					<MdOutlineCheckCircleOutline size={"1.5rem"} className={styles.active} />
				) : (
					<MdBlock size={"1.5rem"} className={styles.inactive} />
				)}
				<IconButton style="secondary" onClick={onClick}>
					<MdOutlineRemoveRedEye size={"1.5rem"} />
				</IconButton>
			</div>
		</div>
	);
};

export default UserCard;
