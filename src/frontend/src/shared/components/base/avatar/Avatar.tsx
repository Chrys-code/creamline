import type React from "react";
import type { AvatarProps } from "./Avatar.types.js";

import styles from "./Avatar.module.scss";

const Avatar: React.FC<AvatarProps> = ({ initials, imageUrl, width, height }: AvatarProps) => {
	if (imageUrl) {
		<img src={imageUrl} style={{ width, height }} alt="avatar" />;
	}

	return (
		<div className={styles.container} style={{ width, height }}>
			{initials && initials.toUpperCase()}
		</div>
	);
};

export default Avatar;
