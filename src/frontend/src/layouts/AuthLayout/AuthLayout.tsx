import type React from "react";
import type { AuthLayoutProps } from "./AuthLayout.types.js";
import styles from "./AuthLayout.module.scss";

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }: AuthLayoutProps) => {
	return (
		<>
			<div className={styles.header}></div>
			<main className={styles.container}>{children}</main>
		</>
	);
};

export default AuthLayout;
