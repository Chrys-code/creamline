import type { ChipProps } from "./Chip.types.ts";
import styles from "./Chip.module.scss";

import React from "react";

const MdClose = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdClose,
	}))
);

const Chip: React.FC<ChipProps> = ({ text }: ChipProps) => {
	return (
		<button className={styles.container}>
			<MdClose size={"1rem"} />
			<span>{text}</span>
		</button>
	);
};

export default Chip;
