import React from "react";
import type { HeaderProps } from "./Header.types";
import styles from "./Header.module.scss";

const MdCheckBoxOutlineBlank = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdCheckBoxOutlineBlank,
	}))
);
const MdOutlineMenu = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdOutlineMenu }))
);

const Header: React.FC<HeaderProps> = ({ onMenuClick }: HeaderProps) => {
	return (
		<div className={styles.container}>
			<MdCheckBoxOutlineBlank size="2rem" fill="white" />
			<button onClick={onMenuClick}>
				<MdOutlineMenu size="2rem" fill="white" />
			</button>
		</div>
	);
};

export default Header;
