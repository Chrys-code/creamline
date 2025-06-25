// import { useEffect, useState } from 'react'
import type { NavProps } from './Nav.types.js'
import styles from './Nav.module.scss'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Nav: React.FC<NavProps> = ({ items }: NavProps) => {
	// const [isCollapsed, setIsCollapsed] = useState(true);
	// const [showHideButton, setShowHideButton] = useState(false)

	// const isEditorPage = useMatch(RoutePaths.EMAIL_EDIT)
	// const isPreviewPage = useMatch(RoutePaths.EMAIL_PREVIEW)
	// const isSharedPreview = useMatch(RoutePaths.EMAIL_SHARED_PREVIEW)

	// const isVisible = !(isEditorPage || isPreviewPage)

	// useEffect(() => {
	// 	setIsCollapsed(!isVisible);
	// 	setShowHideButton(!isVisible);
	// }, [location.pathname, isVisible]);

	// const toggleNavVisibility = () => setIsCollapsed(prevState => !prevState)

	// if (isSharedPreview) {
	// 	return null;
	// }

	// const renderHideButton = () => {
	// 	return (
	// 		<button className={styles.showButton} onClick={toggleNavVisibility}>
	// 			{isCollapsed ? <FaChevronRight size={"0.85rem"} /> : <FaChevronLeft size={"0.85rem"} />}
	// 		</button>
	// 	)
	// }

	// const renderNavItems = () => {
	// 	return items.map(({ title, href }) => (
	// 		<li key={title} className={styles.item}>
	// 			<NavLink to={href}>{title}</NavLink>
	// 		</li>))
	// }

	// const navStyle = `${styles.container} ${isCollapsed ? styles.collapsed : ""}`

	return (
		// <nav className={navStyle}>
		// 	{showHideButton && renderHideButton()}
		// 	<ul className={styles.navList}>
		// 		{renderNavItems()}
		// 	</ul>
		// </nav>

		<>NAV</>
	)
}

export default Nav