import type { MobileFooterNavProps } from './MobileFooterNav.types.ts'

import styles from './MobileFooterNav.module.scss';
import React from 'react';
import { NavLink } from 'react-router';

const MdOutlineAccountCircle = React.lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlineAccountCircle })));
const MdListAlt = React.lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdListAlt })));


const MobileFooterNav: React.FC<MobileFooterNavProps> = ({ }: MobileFooterNavProps) => {
	return (
		<nav className={styles.container}>
			<ul>
				<li>
					<NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>
						<MdListAlt size="2rem" />
						<span>Főoldal</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="profile" className={({ isActive }) => (isActive ? styles.active : undefined)}>
						<MdOutlineAccountCircle size="2rem" />
						<span>Profil</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default MobileFooterNav