import type { RequireAuthData } from "./requireAuth";
import type { RequireProducersData } from "./requireProducers";
import type { RequireStoragesData } from "./requireStorages";

export interface RootLoaderData {
	profile: RequireAuthData;
}

export interface MilkCollectionLoaderData {
	producers: RequireProducersData[];
	storages: RequireStoragesData[];
}