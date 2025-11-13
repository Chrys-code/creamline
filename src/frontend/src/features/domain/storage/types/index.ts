import type z from "zod";
import type schemas from "../services/schemas";

export type Storage = z.infer<typeof schemas.StorageSchema>;

export type CreateUpdateStorageFormSchema = z.infer<typeof schemas.CreateStorageFormSchema>;
