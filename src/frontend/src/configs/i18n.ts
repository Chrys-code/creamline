import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import * as translations from "@/shared/i18n";

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				common: translations.translationEn.common,
				auth: translations.translationEn.auth,
				navigation: translations.translationEn.navigation,
				dashboard: translations.translationEn.dashboard,
				errors: translations.translationEn.errors,
			},
			hu: {
				common: translations.translationHu.common,
				auth: translations.translationHu.auth,
				navigation: translations.translationHu.navigation,
				dashboard: translations.translationHu.dashboard,
				errors: translations.translationHu.errors,
			},
		},
		fallbackLng: "hu",
		interpolation: { escapeValue: false },
		supportedLngs: ["hu", "en"],
	});

export const commonTranslations = translations.translationEn.common;
export default i18n;

import type * as TranslationTypes from "@/shared/i18n/types";
import type { MilkTranslations } from "@/features/domain/milk/types";
import type { PasterisationTranslations } from "@/features/domain/pasteurisation/types";
import type { PasteurTranslations } from "@/features/domain/pasteur/types";
import type { ProducerTranslations } from "@/features/domain/producer/types";
import type { ProductDefinitionTranslations } from "@/features/domain/productDefinition/types";
import type { ProfileTranslations } from "@/features/domain/user/features/profile/types";
import type { StorageTranslations } from "@/features/domain/storage/types";
import type { UserTranslations } from "@/features/domain/user/types";
import i18next from "i18next";

export const namespaces = [
	// Shared
	"common",
	"auth",
	"navigation",
	// Domain
	"users",
	"profile",
	"producer",
	"storage",
	"dashboard",
	"milkCollection",
	"pasteurisation",
	"pasteur",
	"productDefinition",
	// Network
	"errors",
] as const;

export type NamespaceKey = (typeof namespaces)[number];

export type NamespaceMap = {
	common: TranslationTypes.CommonTranslations;
	navigation: TranslationTypes.NavigationTranslations;
	dashboard: TranslationTypes.DashboardTranslations;
	errors: TranslationTypes.ErrorTranslations;
	auth: TranslationTypes.AuthTranslations;
	users: UserTranslations;
	profile: ProfileTranslations;
	producer: ProducerTranslations;
	storage: StorageTranslations;
	milkCollection: MilkTranslations;
	pasteurisation: PasterisationTranslations;
	pasteur: PasteurTranslations;
	productDefinition: ProductDefinitionTranslations;
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
