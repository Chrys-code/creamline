import React from "react";
import type { HeaderProps } from "./Header.types";
import styles from "./Header.module.scss";
import i18n from "../../../configs/i18n";
import LanguageSelector from "../languageSelector";

const MdCheckBoxOutlineBlank = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdCheckBoxOutlineBlank,
	}))
);
const MdOutlineMenu = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdOutlineMenu }))
);

const Header: React.FC<HeaderProps> = ({ onMenuClick }: HeaderProps) => {
	// @ts-expect-error supportedLngs is set to readOnly string[]
	const supportedLanguages = i18n.options.supportedLngs?.filter((l: string) => l !== "cimode");

	const languageOptions: { id: string; value: string }[] = supportedLanguages.map(
		(l: string) => ({
			id: l,
			value: l.toUpperCase(),
		})
	);

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		if (!value) return;

		localStorage.setItem("i18nextLng", value);
		window.location.reload();
	};

	return (
		<div className={styles.container}>
			<MdCheckBoxOutlineBlank size="2rem" fill="white" />
			<div>
				<LanguageSelector
					languageOptions={languageOptions}
					currentLanguageCode={i18n.language}
					onChange={handleLanguageChange}
				/>
				<button onClick={onMenuClick}>
					<MdOutlineMenu size="2rem" fill="white" />
				</button>
			</div>
		</div>
	);
};

export default Header;
