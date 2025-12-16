import type React from "react";
import type { NAVIGATION_ROUTE } from "../../types";
import type { MobileNavProps } from "./SideBarMenu.types";
import styles from "./SideBarMenu.module.scss";

import { NavLink } from "react-router";
import { Fragment } from "react";
import { useTypedTranslation } from "../../hooks/useTypedTranslation/useTypedTranslation.js";
import { v4 as uuid } from "uuid";

const SideBarMenu: React.FC<MobileNavProps> = ({ options, isOpen, setIsOpen }: MobileNavProps) => {
	const tNavigation = useTypedTranslation("navigation");

	const navigationStyle = isOpen ? `${styles.container} ${styles.open}` : styles.container;

	const renderLink = (route: { title: string; path: string }): React.ReactNode => (
		<li key={uuid()}>
			<NavLink
				to={route.path}
				onClick={() => setIsOpen(false)}
				className={({ isActive }) => (isActive ? styles.active : undefined)}
			>
				<span>{route.title}</span>
			</NavLink>
		</li>
	);

	const renderOptions = (options: Record<string, NAVIGATION_ROUTE>) => {
		const elements = [];

		for (const key in options) {
			const route = options[key];

			// If has root, render with sub routes inside
			if ("root" in route) {
				const subRouteElements = [];

				//  Render routes on subKeys
				for (const subKey in route) {
					// Ignore "root" as its used as parent
					if (subKey === "root") continue;
					const subRoute = route[subKey];

					if (subRoute.path && subRoute.title) {
						subRouteElements.push(renderLink(subRoute));
					}
				}

				elements.push(
					<Fragment key={uuid()}>
						{renderLink(route.root)}
						<ul>{subRouteElements}</ul>
					</Fragment>
				);

				continue;
			}

			for (const subKey in route) {
				const subRoute = route[subKey];

				if (subRoute.path && subRoute.title) {
					elements.push(renderLink(subRoute));
				}
			}
		}

		return elements;
	};

	return (
		<aside className={navigationStyle}>
			<h3>{tNavigation("sidebar.title")}</h3>
			<ul>{renderOptions(options)}</ul>
		</aside>
	);
};

export default SideBarMenu;
