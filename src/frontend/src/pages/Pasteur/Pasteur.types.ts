import type { Pasteur, Storage, ProductDefinition } from "../../api/types";

export interface PasteurProps {
	pasteurs: Pasteur[];
	storages: Storage[];
	productDefinitions: ProductDefinition[];
}
