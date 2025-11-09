import type { NamespaceKey } from "../../../configs/i18n";
import type * as TranslationTypes from "../../i18n/types";

export type NamespaceMap = {
	common: TranslationTypes.CommonTranslations;
	auth: TranslationTypes.AuthTranslations;
	navigation: TranslationTypes.NavigationTranslations;
	users: TranslationTypes.UserTranslations;
	profile: TranslationTypes.ProfileTranslations;
	producer: TranslationTypes.ProducerTranslations;
	dashboard: TranslationTypes.DashboardTranslations;
	milkCollection: TranslationTypes.MilkCollectionTranslations;
	pasteurisedMilk: TranslationTypes.PasteurisedMilkTranslations;
};

// Flattens nested keys into dot notations
export type DotNestedKeys<T, Prefix extends string = ""> = {
	[K in keyof T & (string | number)]: T[K] extends Record<string, any>
		? `${Prefix}${K}` | DotNestedKeys<T[K], `${Prefix}${K}.`>
		: `${Prefix}${K}`;
}[keyof T & (string | number)];

export type TypedTFunction<NS extends NamespaceKey> = (
	_key: DotNestedKeys<NamespaceMap[NS]>,
	_options?: any
) => string;
