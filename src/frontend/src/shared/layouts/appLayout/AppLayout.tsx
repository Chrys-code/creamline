import type React from "react";
import type { AppLayoutProps } from "./AppLayout.types";
import styles from "./AppLayout.module.scss";

import { Outlet } from "react-router";
import Header from "../../components/header";
import MobileFooterNav from "../../components/mobileFooterNav";
import { useState } from "react";
import SideBarMenu from "../../components/sideBarMenu/SideBarMenu";

const AppLayout: React.FC<AppLayoutProps> = ({ children }: AppLayoutProps) => {
	const [navigationIsOpen, setNavigationIsOpen] = useState(false);

	return (
		<>
			<Header
				onMenuClick={() => setNavigationIsOpen((navigationIsOpen) => !navigationIsOpen)}
			/>
			<div className={styles.container}>
				<SideBarMenu isOpen={navigationIsOpen} />
				<main className={styles.main}>
					<Outlet />
					{children}
				</main>
			</div>
			<MobileFooterNav />
		</>
	);
};

export default AppLayout;
