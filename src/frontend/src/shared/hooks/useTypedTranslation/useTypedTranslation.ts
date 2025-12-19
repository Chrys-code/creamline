import { useTranslation as useTranslationBase } from "react-i18next";
import type { NamespaceKey, TypedTFunction } from "@/configs/i18n";

/**
 * Used to hint & auto complete translations using i18n.
 * @param namespace Translation name spaces. Provided in i18n config.
 * @returns Flattened paths to translations within the namespace.
 */
export function useTypedTranslation<NS extends NamespaceKey>(namespace: NS): TypedTFunction<NS> {
	const { t } = useTranslationBase(namespace);
	return t as unknown as TypedTFunction<NS>;
}
