import styles from "./MobileFooterNav.module.scss";

import React from "react";
import { NavLink } from "react-router";

import { useTypedTranslation } from "../../hooks/useTypedTranslation/useTypedTranslation";

const MdOutlineAccountCircle = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAccountCircle,
	}))
);
const MdListAlt = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdListAlt }))
);

const MobileFooterNav: React.FC = () => {
	const nt = useTypedTranslation("navigation");

	return (
		<nav className={styles.container}>
			<ul>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<MdListAlt size="2rem" />
						<span>{nt("mobile_navigation.home_page")}</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="profile"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						<MdOutlineAccountCircle size="2rem" />
						<span>{nt("mobile_navigation.profile")}</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default MobileFooterNav;
