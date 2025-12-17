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

			// Collect top level routes without subroutes
			if ("path" in route) {
				if (route.path && route.title) {
					// @ts-expect-error route must have a title
					elements.push(renderLink(route));
				}
				continue;
			}

			// If it has root, render with sub routes inside
			if ("root" in route) {
				const subRouteElements = [];

				//  Collect subroutes
				for (const subKey in route) {
					// Ignore "root" as its used as parent
					if (subKey === "root") continue;
					const subRoute = route[subKey];

					if (subRoute.path && subRoute.title) {
						subRouteElements.push(renderLink(subRoute));
					}
				}

				// Render subroutes underneath root and add them to collection
				elements.push(
					<Fragment key={uuid()}>
						{renderLink(route.root)}
						<ul>{subRouteElements}</ul>
					</Fragment>
				);

				continue;
			}

			// Collect routes without root path as in subroutes
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
