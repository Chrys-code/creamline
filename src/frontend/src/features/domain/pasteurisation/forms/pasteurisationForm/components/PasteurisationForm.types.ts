import type { Pasteurisation } from "../../../types";

export interface PasteurisationFormProps {
	pasteurisation: Pasteurisation | null;
	pasteurOptions: { id: string | number; value: string }[];
	storageOptions: { id: string | number; value: string }[];
	productDefinitionOptions: { id: string | number; value: string }[];
}
