import type React from "react";
import type { TabsProps } from "./Tabs.types";
import styles from "./Tabs.module.scss";

import { v4 as uuid } from "uuid";

const Tabs: React.FC<TabsProps> = ({ pages }: TabsProps) => {
	if (!pages || !pages.length) return null;

	const selectedStyle = styles.selected;

	return (
		<ul className={styles.container}>
			{pages?.map((page) => (
				<li
					className={page.isSelected ? selectedStyle : ""}
					key={uuid()}
					onClick={page.onClick}
				>
					{page.title}
				</li>
			))}
		</ul>
	);
};

export default Tabs;
