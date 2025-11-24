import type React from "react";
import styles from "./AuthLayout.module.scss";

import { Outlet } from "react-router";
import LanguageSelector from "../../components/languageSelector";
import i18n from "../../../configs/i18n";

const AuthLayout: React.FC = () => {
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
		<>
			<div className={styles.header}>
				<div>
					<LanguageSelector
						languageOptions={languageOptions}
						currentLanguageCode={i18n.language}
						onChange={handleLanguageChange}
					/>
				</div>
			</div>
			<main className={styles.container}>
				<Outlet />
			</main>
		</>
	);
};

export default AuthLayout;
