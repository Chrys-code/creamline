import type { Milk } from "../../../domain/milk/types";

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
