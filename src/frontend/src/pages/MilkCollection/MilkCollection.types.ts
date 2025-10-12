import type { Milk, Producer } from "../../api/types";

export interface MilkCollectionProps {
	producers: Producer[];
	storages: Storage[];
	selectedItem: Milk | null;
}
