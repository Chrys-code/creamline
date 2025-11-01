import type z from "zod";

import { schemas } from "./schemas";

export type Login = z.infer<typeof schemas.LoginSchema>;
export type Profile = z.infer<typeof schemas.ProfileSchema>;
export type PatchProfileFormData = z.infer<typeof schemas.PatchProfileSchema>;

export type User = z.infer<typeof schemas.UserSchema>;
export type CreateUserFormData = z.infer<typeof schemas.CreateUserSchema>;
export type PatchUserFormData = z.infer<typeof schemas.PatchUserSchema>;

export type Pasteur = z.infer<typeof schemas.PasteurSchema>;
export type CreateUpdatePasteurFormData = z.infer<typeof schemas.CreatePasteurSchema>;

export type Producer = z.infer<typeof schemas.ProducerSchema>;
export type CreateProducerFormData = z.infer<typeof schemas.CreateProducerSchema>;

export type Storage = z.infer<typeof schemas.StorageSchema>;
export type CreateUpdateStorageFormData = z.infer<typeof schemas.CreateStorageSchema>;

export type ProductDefinition = z.infer<typeof schemas.ProductDefinitionSchema>;
export type CreateUpdateProductDefinitionFormData = z.infer<
	typeof schemas.CreateProductDefinitionSchema
>;

export type Milk = z.infer<typeof schemas.MilkSchema>;
export type ListMilkData = z.infer<typeof schemas.ListMilkSchema>;
export type CreateMilkFormData = z.infer<typeof schemas.CreateMilkSchema>;
export type PatchMilkFormData = z.infer<typeof schemas.PatchMilkSchema>;

export type PasteurisedMilk = z.infer<typeof schemas.PasteurisedMilk>;
export type CreatePasteurisedMilkFormData = z.infer<typeof schemas.CreatePasteurisedMilkSchema>;
export type PatchPasteurisedMilkFormData = z.infer<typeof schemas.PatchPasteurisedMilkSchema>;
export type PaginatedPasteurisedMilkData = z.infer<typeof schemas.ListPasteurisedMilkSchema>;
