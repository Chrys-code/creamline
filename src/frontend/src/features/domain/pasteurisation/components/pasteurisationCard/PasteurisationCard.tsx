import type { PasteurisationCardProps } from "./PasteurisationCard.types";
import styles from "./PasteurisationCard.module.scss";

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

const PasteurisedMilkCard: React.FC<PasteurisationCardProps> = ({
	title,
	datetime,
	createdById,
	onClick,
}: PasteurisationCardProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h3>{title}</h3>
				<div>
					<p>{datetime}</p>
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

export default PasteurisedMilkCard;
