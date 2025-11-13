import type z from "zod";
import type schemas from "../services/schemas";

export type Milk = z.infer<typeof schemas.MilkSchema>;
export type PaginatedMilkListSchema = z.infer<typeof schemas.ListMilkSchema>;

export type CreateMilkFormSchema = z.infer<typeof schemas.CreateMilkFormSchema>;
export type PatchMilkFormSchema = z.infer<typeof schemas.PatchMilkFormSchema>;
