import { LoginSchema } from "./auth/login";
import { SignupSchema } from "./auth/signup";
import { CreateUpdatePasteurSchema, GetPasteurSchema } from "./pasteur";
import { CreateUpdateStorageSchema, GetStorageSchema } from "./storage";
import { CreateUpdateProducerSchema, GetProducerSchema } from "./producer";
import {
	CreateUpdateProductDefinitionSchema,
	GetProductDefinitionSchema,
} from "./productDefinition";
import { PaginatedMilkListSchema, CreateUpdateMilkSchema, GetMilkSchema } from "./milk";
import { ProfileSchema, PatchedProfileSchema } from "./profile";
import {
	CreateUpdatePasteurisedMilkSchema,
	GetPasteurisedMilkSchema,
	PaginatedPasteurisedMilkSchema,
} from "./pasteurisedMilk";

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
