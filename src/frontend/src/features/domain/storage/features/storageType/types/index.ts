import type z from "zod";
import type schemas from "../services/schemas";

export type StorageType = z.infer<typeof schemas.BaseStorageTypeSchema>;
