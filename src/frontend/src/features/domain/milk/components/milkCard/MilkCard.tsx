import type { MilkCardProps } from "./MilkCard.types";
import styles from "./MilkCard.module.scss";

import React from "react";

import UserAvatar from "@/features/domain/user/features/profile/components/userAvatar";
import IconButton from "@/shared/components/base/iconButton";

const MdOutlineRemoveRedEye = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineRemoveRedEye,
	}))
);

// const MdOutlineDelete = React.lazy(() =>
// 	import("react-icons/md").then((mod) => ({
// 		default: mod.MdOutlineDelete,
// 	}))
// );

const MdOutlineFileDownload = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineFileDownload,
	}))
);
const MilkCard: React.FC<MilkCardProps> = ({
	title,
	storages,
	datetime,
	createdById,
	onClick,
}: MilkCardProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<div className={styles.content}>
				<h3>{title}</h3>
				<div>
					<p>
						{datetime}, {storages}
					</p>
				</div>
			</div>
			<UserAvatar userId={createdById} width={"2.5rem"} height={"2.5rem"} />
			<div className={styles.actionsWrapper}>
				<IconButton style="secondary" onClick={onClick}>
					<MdOutlineRemoveRedEye size={"1.5rem"} />
				</IconButton>
				<IconButton style="secondary" onClick={onClick}>
					<MdOutlineFileDownload size={"1.5rem"} />
				</IconButton>
				{/* <IconButton style="secondary" onClick={onClick}>
					<MdOutlineDelete size={"1.5rem"} />
				</IconButton> */}
			</div>
		</div>
	);
};

export default MilkCard;
