import type React from "react";
import type { AppLayoutProps } from "./AppLayout.types";
import styles from "./AppLayout.module.scss";

import { NAVIGATION_ROUTES } from "../../../configs/navigation";

import Header from "../../components/header";
import MobileFooterNav from "../../components/mobileFooterNav";
import SideBarMenu from "../../components/sideBarMenu/SideBarMenu";

import { Outlet, useRouteLoaderData } from "react-router";
import { useState } from "react";
import { getRoutesForRoles } from "../../helpers/getNavigationRoutesForRoles/getNavigationRoutesForRoles";

const AppLayout: React.FC<AppLayoutProps> = ({ children }: AppLayoutProps) => {
	const { profile } = useRouteLoaderData("app");
	const [navigationIsOpen, setNavigationIsOpen] = useState(false);

	return (
		<>
			<Header
				onMenuClick={() => setNavigationIsOpen((navigationIsOpen) => !navigationIsOpen)}
			/>
			<div className={styles.container}>
				<SideBarMenu
					options={getRoutesForRoles({
						routes: NAVIGATION_ROUTES,
						userGroups: profile.groups,
						ignoredRoutes: ["login", "profile"],
					})}
					isOpen={navigationIsOpen}
					setIsOpen={setNavigationIsOpen}
				/>
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
