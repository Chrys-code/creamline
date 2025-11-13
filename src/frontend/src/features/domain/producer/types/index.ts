import type z from "zod";
import type schemas from "../services/schemas";

export type Producer = z.infer<typeof schemas.ProducerSchema>;

export type CreateProducerFormSchema = z.infer<typeof schemas.CreateProducerFormSchema>;
