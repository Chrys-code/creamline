import type { NamespaceKey } from "../../../configs/i18n";
import type { TypedTFunction } from "./useTypesTranslation.types";

import { useTranslation as useTranslationBase } from "react-i18next";

export function useTypedTranslation<NS extends NamespaceKey>(namespace: NS): TypedTFunction<NS> {
	const { t } = useTranslationBase(namespace);
	return t as unknown as TypedTFunction<NS>;
}
