import type z from "zod";

import { schemas } from "./schemas";

export type Login = z.infer<typeof schemas.LoginSchema>;
export type Profile = z.infer<typeof schemas.ProfileSchema>;
export type PatchedProfile = z.infer<typeof schemas.PatchedProfileSchema>;

export type Pasteur = z.infer<typeof schemas.GetPasteurSchema>;
export type CreateUpdatePasteurFormData = z.infer<typeof schemas.CreateUpdatePasteurSchema>;

export type Producer = z.infer<typeof schemas.GetProducerSchema>;
export type CreateUpdateProducerFormData = z.infer<typeof schemas.CreateUpdateProducerSchema>;

export type Storage = z.infer<typeof schemas.GetStorageSchema>;
export type CreateUpdateStorageFormData = z.infer<typeof schemas.CreateUpdateStorageSchema>;

export type ProductDefinition = z.infer<typeof schemas.GetProductDefinitionSchema>;
export type CreateUpdateProductDefinitionFormData = z.infer<
	typeof schemas.CreateUpdateProductDefinitionSchema
>;

export type Milk = z.infer<typeof schemas.GetMilkSchema>;
export type CreateUpdateMilkFormData = z.infer<typeof schemas.CreateUpdateMilkSchema>;
export type PaginatedMilkListData = z.infer<typeof schemas.PaginatedMilkListSchema>;

export type PasteurisedMilk = z.infer<typeof schemas.GetPasteurisedMilkSchema>;
export type CreateUpdatePasteurisedMilkFormData = z.infer<
	typeof schemas.CreateUpdatePasteurisedMilkSchema
>;
export type PaginatedPasteurisedMilkData = z.infer<typeof schemas.PaginatedPasteurisedMilkSchema>;
