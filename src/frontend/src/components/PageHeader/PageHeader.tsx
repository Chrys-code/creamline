import React from "react";

import type { PageHeaderProps } from "./PageHeader.types.js";
import styles from "./PageHeader.module.scss";
import { useNavigate } from "react-router";

const MdChevronLeft = React.lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdChevronLeft })));

const PageHeader: React.FC<PageHeaderProps> = ({ title }: PageHeaderProps) => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<MdChevronLeft size="2.5rem" onClick={() => navigate(-1)} />
			<h1>{title}</h1>
		</div>
	);
};

export default PageHeader;