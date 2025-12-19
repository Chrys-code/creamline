import { NAVIGATION_ROUTES } from "@/configs/navigation";
import i18n from "@/configs/i18n";

import type { HeaderProps } from "./Header.types";
import styles from "./Header.module.scss";

import React from "react";
import { toast } from "react-toastify";
import LanguageSelector from "../languageSelector";

import { useNavigate } from "react-router";

import { authClient } from "@/features/domain/auth/services/client";

const MdCheckBoxOutlineBlank = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdCheckBoxOutlineBlank,
	}))
);
const MdOutlineMenu = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdOutlineMenu }))
);
const MdOutlineLogout = React.lazy(() =>
	import("react-icons/md").then((mod) => ({ default: mod.MdOutlineLogout }))
);

const Header: React.FC<HeaderProps> = ({ onMenuClick }: HeaderProps) => {
	const navigate = useNavigate();
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

	const handleLogout = async () => {
		try {
			// @ts-expect-error no body required on post request
			await authClient.logout();
			navigate(NAVIGATION_ROUTES.login.path);
		} catch {
			toast.error("Someting went wrong");
		}
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
				<button onClick={() => handleLogout()}>
					<MdOutlineLogout size="1.5rem" fill="white" />
				</button>
				<button className={styles.mobileMenu} onClick={onMenuClick}>
					<MdOutlineMenu size="2rem" fill="white" />
				</button>
			</div>
		</div>
	);
};

export default Header;
