import { LoginSchema } from "./auth/login";
import { SignupSchema } from "./auth/signup";
import { PasteurSchema } from "./pasteur";
import { StorageSchema, StorageTypeEnum } from "./storage";
import { ProducerSchema } from "./producer";
import { ProductDefinitionSchema, ProductDefinitionTypeEnum } from "./productDefinition";
import { MilkSchema } from "./milk";
import { ProfileSchema, PatchedProfileSchema } from "./profile";
import { PasteurisedMilkSchema } from "./pasteurisedMilk";

export const schemas = {
	LoginSchema,
	SignupSchema,
	PasteurSchema,
	StorageSchema,
	StorageTypeEnum,
	ProducerSchema,
	ProductDefinitionSchema,
	ProductDefinitionTypeEnum,
	MilkSchema,
	PasteurisedMilkSchema,
	ProfileSchema,
	PatchedProfileSchema,
};
