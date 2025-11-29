import type React from "react";
import type { MobileNavProps } from "./SideBarMenu.types";
import styles from "./SideBarMenu.module.scss";

import { NavLink } from "react-router";
import { useTypedTranslation } from "../../hooks/useTypedTranslation/useTypedTranslation.js";

const SideBarMenu: React.FC<MobileNavProps> = ({ isOpen }: MobileNavProps) => {
	const tNavigation = useTypedTranslation("navigation");

	const navigationStyle = isOpen ? `${styles.container} ${styles.open}` : styles.container;

	return (
		<aside className={navigationStyle}>
			<h3>{tNavigation("sidebar.title")}</h3>
			<ul>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.home")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/users"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.users")}</span>
					</NavLink>
				</li>
			</ul>

			<h3>{tNavigation("sidebar.processes.section_title")}</h3>
			<ul>
				<li>
					<NavLink
						to="/milk-collection"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>
							{tNavigation("sidebar.processes.milk_collection.milk_collection")}
						</span>
					</NavLink>
				</li>
				<ul>
					<li>
						<NavLink
							to="/milk-collection/list"
							className={({ isActive }) => (isActive ? styles.active : undefined)}
						>
							<span>
								{tNavigation(
									"sidebar.processes.milk_collection.milk_collection_list"
								)}
							</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/milk-collection/create"
							className={({ isActive }) => (isActive ? styles.active : undefined)}
						>
							<span>
								{tNavigation(
									"sidebar.processes.milk_collection.milk_collection_create"
								)}
							</span>
						</NavLink>
					</li>
				</ul>
				<li>
					<NavLink
						to="/pasteurised-milk"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.processes.pasteurisation")}</span>
					</NavLink>
				</li>
			</ul>

			<h3>{tNavigation("sidebar.utilities.section_title")}</h3>
			<ul>
				<li>
					<NavLink
						to="/producer"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.producer")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/storage"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.storage")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/pasteur"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.pasteur")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/product-definition"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.product_definitions")}</span>
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default SideBarMenu;
