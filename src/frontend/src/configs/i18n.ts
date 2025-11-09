import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as translations from "../lib/i18n";

export const namespaces = [
	"common",
	"auth",
	"navigation",
	"users",
	"profile",
	"producer",
	"dashboard",
	"milkCollection",
	"pasteurisedMilk",
] as const;

export type NamespaceKey = (typeof namespaces)[number];

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				common: translations.translationEn.common,
				auth: translations.translationEn.auth,
				navigation: translations.translationEn.navigation,
				users: translations.translationEn.users,
				profile: translations.translationEn.profile,
				producer: translations.translationEn.producer,
				dashboard: translations.translationEn.dashboard,
				milkCollection: translations.translationEn.milkCollection,
				pasteurisation: translations.translationEn.pasteurisation,
			},
			hu: {
				common: translations.translationHu.common,
				auth: translations.translationHu.auth,
				navigation: translations.translationHu.navigation,
				users: translations.translationHu.users,
				profile: translations.translationHu.profile,
				producer: translations.translationHu.producer,
				dashboard: translations.translationHu.dashboard,
				milkCollection: translations.translationHu.milkCollection,
				pasteurisation: translations.translationHu.pasteurisation,
			},
		},
		fallbackLng: "en",
		interpolation: { escapeValue: false },
	});

export default i18n;
