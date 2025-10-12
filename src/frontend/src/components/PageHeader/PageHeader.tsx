import type { PageHeaderProps } from "./PageHeader.types.js";
import styles from "./PageHeader.module.scss";

import React from "react";
import { useNavigate } from "react-router";

const MdChevronLeft = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdChevronLeft }))
);

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	onNavigateBack,
	actionElement,
}: PageHeaderProps) => {
	const navigate = useNavigate();

	const handleNavigateBack = () => {
		if (onNavigateBack) {
			onNavigateBack();
		} else {
			navigate(-1);
		}
	};

	return (
		<div className={styles.container}>
			<MdChevronLeft size="2rem" onClick={() => handleNavigateBack()} />
			<h1>{title}</h1>
			{actionElement && <div>{actionElement}</div>}
		</div>
	);
};

export default PageHeader;
