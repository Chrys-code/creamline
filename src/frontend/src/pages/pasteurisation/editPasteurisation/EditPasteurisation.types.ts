import type { Pasteur, Storage, ProductDefinition, PasteurisedMilk } from "../../../api/types";

export interface EditPasteurisationProps {
	pasteurs: Pasteur[];
	storages: Storage[];
	productDefinitions: ProductDefinition[];
	selectedItem: PasteurisedMilk | null;
}
