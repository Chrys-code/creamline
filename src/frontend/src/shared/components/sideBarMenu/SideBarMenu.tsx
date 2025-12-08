import type React from "react";
import type { MobileNavProps } from "./SideBarMenu.types";
import styles from "./SideBarMenu.module.scss";

import { NavLink } from "react-router";
import { useTypedTranslation } from "../../hooks/useTypedTranslation/useTypedTranslation.js";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const SideBarMenu: React.FC<MobileNavProps> = ({ isOpen }: MobileNavProps) => {
	const tNavigation = useTypedTranslation("navigation");

	const navigationStyle = isOpen ? `${styles.container} ${styles.open}` : styles.container;

	return (
		<aside className={navigationStyle}>
			<h3>{tNavigation("sidebar.title")}</h3>
			<ul>
				<li>
					<NavLink
						to={NAVIGATION_ROUTES.app}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.home")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={NAVIGATION_ROUTES.user.list}
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
						to={NAVIGATION_ROUTES.milkCollection.root}
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
							to={NAVIGATION_ROUTES.milkCollection.list}
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
							to={NAVIGATION_ROUTES.milkCollection.create}
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
						to={NAVIGATION_ROUTES.pasteuriation.root}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>
							{tNavigation("sidebar.processes.pasteurisation.pasteurisation")}
						</span>
					</NavLink>
				</li>
				<ul>
					<li>
						<NavLink
							to={NAVIGATION_ROUTES.pasteuriation.list}
							className={({ isActive }) => (isActive ? styles.active : undefined)}
						>
							<span>
								{tNavigation(
									"sidebar.processes.pasteurisation.pasteurisation_list"
								)}
							</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to={NAVIGATION_ROUTES.pasteuriation.create}
							className={({ isActive }) => (isActive ? styles.active : undefined)}
						>
							<span>
								{tNavigation(
									"sidebar.processes.pasteurisation.pasteurisation_create"
								)}
							</span>
						</NavLink>
					</li>
				</ul>
			</ul>

			<h3>{tNavigation("sidebar.utilities.section_title")}</h3>
			<ul>
				<li>
					<NavLink
						to={NAVIGATION_ROUTES.producer.list}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.producer")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={NAVIGATION_ROUTES.storage.list}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.storage")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={NAVIGATION_ROUTES.pasteur.list}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<span>{tNavigation("sidebar.utilities.pasteur")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={NAVIGATION_ROUTES.productDefinition.list}
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
