import type { Pasteur, Storage, ProductDefinition, PasteurisedMilk } from "../../api/types";

export interface PasteurisationProps {
	pasteurs: Pasteur[];
	storages: Storage[];
	productDefinitions: ProductDefinition[];
	selectedItem: PasteurisedMilk | null;
}
