import type { Pasteur, Storage, ProductDefinition, PasteurisedMilk } from "../../api/types";

export interface PasteurProps {
	pasteurs: Pasteur[];
	storages: Storage[];
	productDefinitions: ProductDefinition[];
	selectedItem: PasteurisedMilk | null;
}
