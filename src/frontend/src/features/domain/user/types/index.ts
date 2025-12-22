import type z from "zod";
import type schemas from "../services/userSchemas";

export type User = z.infer<typeof schemas.UserSchema>;
export type PaginatedUserList = z.infer<typeof schemas.ListUserSchema>;

export type UserFormSchema = z.infer<typeof schemas.UserFormSchema>;
export type CreateUserFormSchema = z.infer<typeof schemas.CreateUserFormSchema>;
export type PatchUserFormSchema = z.infer<typeof schemas.PatchUserFormSchema>;

import userTranslations from "../i18n";
export type UserTranslations = typeof userTranslations.en;
