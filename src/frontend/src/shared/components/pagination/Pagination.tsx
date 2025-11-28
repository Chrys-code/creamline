import type { PaginationProps } from "./Pagination.types.ts";
import styles from "./Pagination.module.scss";

import React from "react";
import IconButton from "../base/iconButton";

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
