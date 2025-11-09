import { useTranslation as useTranslationBase } from "react-i18next";
import type { NamespaceKey, TypedTFunction } from "../../../configs/i18n";

export function useTypedTranslation<NS extends NamespaceKey>(namespace: NS): TypedTFunction<NS> {
	const { t } = useTranslationBase(namespace);
	return t as unknown as TypedTFunction<NS>;
}
