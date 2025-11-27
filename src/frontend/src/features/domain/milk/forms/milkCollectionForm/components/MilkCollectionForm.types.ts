import type { Milk } from "../../../types";

export interface MilkCollectionFormProps {
	milk: Milk | null;
	producerOptions: {
		id: string | number;
		value: string;
	}[];
	storageOptions: {
		id: string | number;
		value: string;
	}[];
}
