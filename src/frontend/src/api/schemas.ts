import { LoginSchema } from "./endpoints/auth/login";
import {
	PasteurSchema,
	ListPasteurSchema,
	CreatePasteurSchema,
	PatchPasteurSchema,
} from "./endpoints/pasteur/schema";
import {
	StorageSchema,
	ListStorageSchema,
	CreateStorageSchema,
	PatchStorageSchema,
} from "./endpoints/storage/schema";
import {
	ProducerSchema,
	CreateProducerSchema,
	PatchProducerSchema,
} from "./endpoints/producer/schema";
import {
	ProductDefinitionSchema,
	CreateProductDefinitionSchema,
} from "./endpoints/productDefinition/schema";
import { ProfileSchema, PatchProfileSchema } from "./endpoints/profile/schema";
import {
	PasteurisedMilk,
	ListPasteurisedMilkSchema,
	CreatePasteurisedMilkSchema,
	PatchPasteurisedMilkSchema,
} from "./endpoints/pasteurisedMilk/schema";
import {
	MilkSchema,
	ListMilkSchema,
	CreateMilkSchema,
	PatchMilkSchema,
} from "./endpoints/milk/schema";
import {
	UserSchema,
	ListUserSchema,
	CreateUserSchema,
	PatchUserSchema,
	UserFormSchema,
} from "./endpoints/user/schema";
import { UserGroupBaseSchema } from "./endpoints/user_groups/schema";

export const schemas = {
	// Auth
	LoginSchema,

	// User Profile (me)
	ProfileSchema,
	PatchProfileSchema,

	// Domain
	UserGroupBaseSchema,

	// User Management
	UserSchema,
	ListUserSchema,
	UserFormSchema,
	CreateUserSchema,
	PatchUserSchema,

	// Process results
	MilkSchema,
	ListMilkSchema,
	CreateMilkSchema,
	PatchMilkSchema,

	PasteurisedMilk,
	ListPasteurisedMilkSchema,
	CreatePasteurisedMilkSchema,
	PatchPasteurisedMilkSchema,

	// Misc
	PasteurSchema,
	ListPasteurSchema,
	CreatePasteurSchema,
	PatchPasteurSchema,

	StorageSchema,
	ListStorageSchema,
	CreateStorageSchema,
	PatchStorageSchema,

	ProducerSchema,
	CreateProducerSchema,
	PatchProducerSchema,

	ProductDefinitionSchema,
	CreateProductDefinitionSchema,
};
