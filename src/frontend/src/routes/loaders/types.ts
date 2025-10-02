import type { RequireAuthData } from "./requireAuth";
import type { RequirePasteursData } from "./requirePasteurs";
import type { RequireProducersData } from "./requireProducers";
import type { RequireProductDefinitionsData } from "./requireProductDefinitions";
import type { RequireStoragesData } from "./requireStorages";

export interface RootLoaderData {
	profile: RequireAuthData;
}

export interface MilkCollectionLoaderData {
	producers: RequireProducersData[];
	storages: RequireStoragesData[];
}

export interface PasteurLoaderData {
	pasteurs: RequirePasteursData[];
	storages: RequireStoragesData[];
	productDefinitions: RequireProductDefinitionsData[];
}

