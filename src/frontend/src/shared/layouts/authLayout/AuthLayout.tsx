import type React from "react";
import styles from "./AuthLayout.module.scss";

import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
	return (
		<>
			<div className={styles.header}></div>
			<main className={styles.container}>
				<Outlet />
			</main>
		</>
	);
};

export default AuthLayout;
