import type { Pasteurisation } from "../../../domain/pasteurisation/types";

export interface PasteurisationFormProps {
	pasteurisation: Pasteurisation | null;
	pasteurOptions: { id: string | number; value: string }[];
	storageOptions: { id: string | number; value: string }[];
	productDefinitionOptions: { id: string | number; value: string }[];
}
