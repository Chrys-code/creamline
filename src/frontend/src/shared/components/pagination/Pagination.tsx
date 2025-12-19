import type { PaginationProps } from "./Pagination.types";
import styles from "./Pagination.module.scss";

import IconButton from "../base/iconButton";

import React from "react";

const MdChevronLeft = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdChevronLeft }))
);
const MdChevronRight = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdChevronRight }))
);

const Pagination: React.FC<PaginationProps> = ({
	isFirst,
	isLast,
	onDecrease,
	onIncrease,
	children,
}: PaginationProps) => {
	return (
		<div className={styles.container}>
			<IconButton style="primary" type="button" onClick={onDecrease} disabled={isFirst}>
				<MdChevronLeft size={"1rem"} />
			</IconButton>
			{children}
			<IconButton style="primary" type="button" onClick={onIncrease} disabled={isLast}>
				<MdChevronRight size={"1rem"} />
			</IconButton>
		</div>
	);
};

export default Pagination;
