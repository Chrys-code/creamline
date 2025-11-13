import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as translations from "../shared/i18n";

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
		fallbackLng: "hu",
		interpolation: { escapeValue: false },
	});

export default i18n;

import type * as TranslationTypes from "../shared/i18n/types";
import i18next from "i18next";

export const namespaces = [
	"common",
	"auth",
	"navigation",
	"users",
	"profile",
	"producer",
	"dashboard",
	"milkCollection",
	"pasteurisation",
] as const;

export type NamespaceKey = (typeof namespaces)[number];

export type NamespaceMap = {
	common: TranslationTypes.CommonTranslations;
	auth: TranslationTypes.AuthTranslations;
	navigation: TranslationTypes.NavigationTranslations;
	users: TranslationTypes.UserTranslations;
	profile: TranslationTypes.ProfileTranslations;
	producer: TranslationTypes.ProducerTranslations;
	dashboard: TranslationTypes.DashboardTranslations;
	milkCollection: TranslationTypes.MilkCollectionTranslations;
	pasteurisation: TranslationTypes.PasteurisedMilkTranslations;
};

// Flattens nested keys into dot notations
export type DotNestedKeys<T, Prefix extends string = ""> = {
	[K in keyof T & (string | number)]: T[K] extends Record<string, any>
		? `${Prefix}${K}` | DotNestedKeys<T[K], `${Prefix}${K}.`>
		: `${Prefix}${K}`;
}[keyof T & (string | number)];

// Use for typed hooks
export type TypedTFunction<NS extends NamespaceKey> = (
	_key: DotNestedKeys<NamespaceMap[NS]>,
	_options?: any
) => string;

// Use outside of React Context
export function tTyped<NS extends NamespaceKey>(namespace: NS): TypedTFunction<NS> {
	return ((key: string, options?: any) =>
		i18next.t(key, { ns: namespace, ...options })) as TypedTFunction<NS>;
}
