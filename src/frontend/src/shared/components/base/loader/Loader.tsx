import type React from "react";

import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
	return (
		<div className={styles.container}>
			<div data-delay="0"></div>
			<div data-delay="1"></div>
			<div data-delay="2"></div>
		</div>
	);
};

export default Loader;
