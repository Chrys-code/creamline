import type { Pasteurisation } from "../../../features/domain/pasteurisation/types";

export interface EditPasteurisationProps {
	pasteurOptions: {
		id: string;
		value: string;
	}[];
	storageOptions: {
		id: string;
		value: string;
	}[];
	productDefinitionOptions: {
		id: string;
		value: string;
	}[];
	selectedItem: Pasteurisation | null;
}
