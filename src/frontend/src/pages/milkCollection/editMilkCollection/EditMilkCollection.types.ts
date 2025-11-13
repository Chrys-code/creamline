import type { Milk } from "../../../features/domain/milk/types";

export interface EditMilkCollectionProps {
	producerOptions: {
		id: string;
		value: string;
	}[];
	storageOptions: {
		id: string;
		value: string;
	}[];
	selectedItem: Milk | null;
}
