import { LoginSchema } from "./auth/login";
import { SignupSchema } from "./auth/signup";
import { CreateUpdatePasteurSchema, GetPasteurSchema } from "./pasteur/schema";
import { CreateUpdateStorageSchema, GetStorageSchema } from "./storage/schema";
import { CreateUpdateProducerSchema, GetProducerSchema } from "./producer/schema";
import {
	CreateUpdateProductDefinitionSchema,
	GetProductDefinitionSchema,
} from "./productDefinition/schema";
import { ProfileSchema, PatchedProfileSchema } from "./profile/schema";
import {
	CreateUpdatePasteurisedMilkSchema,
	GetPasteurisedMilkSchema,
	PaginatedPasteurisedMilkSchema,
} from "./pasteurisedMilk/schema";
import { CreateUpdateMilkSchema, GetMilkSchema, PaginatedMilkListSchema } from "./milk/schema";

export const schemas = {
	LoginSchema,
	SignupSchema,

	ProfileSchema,
	PatchedProfileSchema,

	CreateUpdatePasteurSchema,
	GetPasteurSchema,

	CreateUpdateStorageSchema,
	GetStorageSchema,

	CreateUpdateProducerSchema,
	GetProducerSchema,

	CreateUpdateProductDefinitionSchema,
	GetProductDefinitionSchema,

	CreateUpdateMilkSchema,
	GetMilkSchema,
	PaginatedMilkListSchema,

	CreateUpdatePasteurisedMilkSchema,
	GetPasteurisedMilkSchema,
	PaginatedPasteurisedMilkSchema,
};
