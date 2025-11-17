import type z from "zod";
import type schemas from "../services/schemas";

export type UserGroup = z.infer<typeof schemas.UserGroupBaseSchema>;
