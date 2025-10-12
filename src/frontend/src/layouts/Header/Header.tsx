import styles from "./Header.module.scss";
import React from "react";

const MdCheckBoxOutlineBlank = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdCheckBoxOutlineBlank,
	}))
);
const MdOutlineMenu = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdOutlineMenu }))
);

const Header: React.FC = () => {
	return (
		<div className={styles.container}>
			<MdCheckBoxOutlineBlank size="2rem" fill="white" />
			<menu>
				<MdOutlineMenu size="2rem" fill="white" />
			</menu>
		</div>
	);
};

export default Header;
