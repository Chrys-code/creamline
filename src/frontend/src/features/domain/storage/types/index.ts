import type z from "zod";
import type schemas from "../services/schemas";

export type Storage = z.infer<typeof schemas.StorageSchema>;
export type PaginatedStorageList = z.infer<typeof schemas.PaginatedListStorageSchema>;

export type StorageFormSchema = z.infer<typeof schemas.StorageFormSchema>;
export type CreateStorageFormSchema = z.infer<typeof schemas.CreateStorageFormSchema>;
export type UpdateStorageFormSchema = z.infer<typeof schemas.PatchStorageFormSchema>;
