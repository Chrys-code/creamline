import type React from "react";
import type { AppLayoutProps } from "./AppLayout.types";
import styles from "./AppLayout.module.scss";

import { Outlet } from "react-router";
import Header from "../header";
import MobileFooterNav from "../mobileFooterNav";

const AppLayout: React.FC<AppLayoutProps> = ({ children }: AppLayoutProps) => {
	return (
		<>
			<Header />
			<main className={styles.container}>
				<Outlet />
				{children}
			</main>
			<MobileFooterNav />
		</>
	);
};

export default AppLayout;
