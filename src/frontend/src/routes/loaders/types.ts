import type { Pasteur, Producer, ProductDefinition, Profile } from "../../api/types";

export interface RootLoaderData {
	profile: Profile;
}

export interface MilkCollectionLoaderData {
	producers: Producer[];
	storages: Storage[];
}

export interface PasteurLoaderData {
	pasteurs: Pasteur[];
	storages: Storage[];
	productDefinitions: ProductDefinition[];
}
