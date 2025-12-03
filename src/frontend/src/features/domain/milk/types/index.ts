import type z from "zod";
import type schemas from "../services/schemas";

export type Milk = z.infer<typeof schemas.MilkSchema>;
export type PaginatedMilkListSchema = z.infer<typeof schemas.PaginatedListMilkSchema>;

export type CreateMilkFormSchema = z.infer<typeof schemas.CreateMilkFormSchema>;
export type PatchMilkFormSchema = z.infer<typeof schemas.PatchMilkFormSchema>;

export type MilkTrend = z.infer<typeof schemas.MilkTrendSchema>;
export type MilkSummary = z.infer<typeof schemas.MilkSummarySchema>;
