import type z from "zod";

import { schemas } from "./schemas";

export type Login = z.infer<typeof schemas.LoginSchema>;
export type Profile = z.infer<typeof schemas.ProfileSchema>;
export type PatchedProfile = z.infer<typeof schemas.PatchedProfileSchema>;
export type Pasteur = z.infer<typeof schemas.PasteurSchema>;
export type Producer = z.infer<typeof schemas.ProducerSchema>;
export type Storage = z.infer<typeof schemas.StorageSchema>;
export type ProductDefinition = z.infer<typeof schemas.ProductDefinitionSchema>;
export type Milk = z.infer<typeof schemas.MilkSchema>;
export type PasteurisedMilk = z.infer<typeof schemas.PasteurisedMilkSchema>;
