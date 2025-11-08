import type { Milk, Producer } from "../../../api/types";

export interface EditMilkCollectionProps {
	producers: Producer[];
	storages: Storage[];
	selectedItem: Milk | null;
}
