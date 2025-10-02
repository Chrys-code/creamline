import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";
import i18n from "../../configs/i18n";

const Login = z
  .object({
    email: z.string().email({ message: i18n.t("login.input_email_invalid") }),
    password: z.string().min(1, { message: i18n.t("login.input_password_required") })
  })
  .passthrough();

const Signup = z
  .object({ email: z.string().max(255).email(), password: z.string().min(8) })
  .passthrough();

const Milk = z
  .object({
    uuid: z.string().uuid(),
    producer: z.string().uuid(),
    producer_uuid: z.string().optional(),
    producer_name: z.string().optional(),
    storage: z.string().uuid(),
    storage_uuid: z.string().optional(),
    storage_name: z.string().optional(),
    storage_type: z.string().optional(),
    volume_kg: z.number().gte(1),
    volume_liters: z.number().gte(1),
    acid_content: z.number().gte(0).optional(),
    aflatoxin: z.boolean().optional(),
    inhibitory_residue: z.boolean().optional(),
    temperature: z.number().gte(-273.15).optional(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .passthrough();

const PatchedMilk = z
  .object({
    uuid: z.string().uuid(),
    producer: z.string().uuid(),
    producer_uuid: z.string(),
    producer_name: z.string(),
    storage: z.string().uuid(),
    storage_uuid: z.string(),
    storage_name: z.string(),
    storage_type: z.string(),
    volume_kg: z.number().gte(1),
    volume_liters: z.number().gte(1),
    acid_content: z.number().gte(0),
    aflatoxin: z.boolean(),
    inhibitory_residue: z.boolean(),
    temperature: z.number().gte(-273.15),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .partial()
  .passthrough();

const Pasteur = z
  .object({
    uuid: z.string().uuid(),
    name: z.string().max(255),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .passthrough();

const Producer = z
  .object({
    uuid: z.string().uuid().optional(),
    name: z.string().max(255).min(1, { message: i18n.t("add_producer.input_name_required") }),
    address: z.string().min(1, { message: i18n.t("add_producer.input_address_required") }).max(100),
    contact_email: z.string().max(256).email({ message: i18n.t("add_producer.input_email_invalid") }).or(z.literal("")).nullish(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    deleted_at: z.string().datetime({ offset: true }).nullable().optional(),
  })
  .passthrough();

const PatchedProducer = z
  .object({
    uuid: z.string().uuid(),
    name: z.string().max(255),
    address: z.string().max(100),
    contact_email: z.string().max(256).email().nullable(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .partial()
  .passthrough();

const ProductDefinitionTypeEnum = z.enum([
  "CREAM",
  "WHOLE MILK",
  "SKIMMED MILK",
]);

const ProductDefinition = z
  .object({
    uuid: z.string().uuid(),
    name: z.string().max(255),
    type: ProductDefinitionTypeEnum,
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .passthrough();

const Profile = z
  .object({
    uuid: z.string().uuid(),
    email: z.string().max(255).email().nullish(),
    profile_image: z.string().max(256).nullish(),
    first_name: z.string().max(100).optional(),
    last_name: z.string().max(100).optional(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .passthrough();

const PatchedProfile = z
  .object({
    uuid: z.string().uuid(),
    email: z.string().max(255).email().nullable(),
    profile_image: z.string().max(256).nullable(),
    first_name: z.string().max(100),
    last_name: z.string().max(100),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .partial()
  .passthrough();

const StorageTypeEnum = z.enum(["SILO", "TUB", "CONTAINER"]);
const Storage = z
  .object({
    uuid: z.string().uuid(),
    name: z.string().max(255),
    type: StorageTypeEnum,
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .passthrough();

const PatchedStorage = z
  .object({
    uuid: z.string().uuid(),
    name: z.string().max(255),
    type: StorageTypeEnum,
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    deleted_at: z.string().datetime({ offset: true }).nullable(),
  })
  .partial()
  .passthrough();

export const schemas = {
  Login,
  Signup,
  Milk,
  PatchedMilk,
  Pasteur,
  Producer,
  PatchedProducer,
  ProductDefinitionTypeEnum,
  ProductDefinition,
  Profile,
  PatchedProfile,
  StorageTypeEnum,
  Storage,
  PatchedStorage,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/login/",
    alias: "login_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Login,
      },
    ],
    response: Login,
  },
  {
    method: "post",
    path: "/api/logout/",
    alias: "logout_create",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/schema/",
    alias: "schema_retrieve",
    description: `OpenApi3 schema for this API. Format can be selected via content negotiation.

- YAML: application/vnd.oai.openapi
- JSON: application/vnd.oai.openapi+json`,
    requestFormat: "json",
    parameters: [
      {
        name: "format",
        type: "Query",
        schema: z.enum(["json", "yaml"]).optional(),
      },
      {
        name: "lang",
        type: "Query",
        schema: z.enum(["en", "hu"]).optional(),
      },
    ],
    response: z.object({}).partial().passthrough(),
  },
  {
    method: "get",
    path: "/api/session/",
    alias: "session_retrieve",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/signup/",
    alias: "signup_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Signup,
      },
    ],
    response: Signup,
  },
  {
    method: "get",
    path: "/api/v1/milk/",
    alias: "v1_milk_list",
    requestFormat: "json",
    response: z.array(Milk),
  },
  {
    method: "post",
    path: "/api/v1/milk/",
    alias: "v1_milk_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Milk,
      },
    ],
    response: Milk,
  },
  {
    method: "get",
    path: "/api/v1/milk/:id/",
    alias: "v1_milk_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Milk,
  },
  {
    method: "put",
    path: "/api/v1/milk/:id/",
    alias: "v1_milk_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Milk,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Milk,
  },
  {
    method: "patch",
    path: "/api/v1/milk/:id/",
    alias: "v1_milk_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedMilk,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Milk,
  },
  {
    method: "delete",
    path: "/api/v1/milk/:id/",
    alias: "v1_milk_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/v1/pasteur/",
    alias: "v1_pasteur_list",
    requestFormat: "json",
    response: z.array(Pasteur),
  },
  {
    method: "get",
    path: "/api/v1/pasteur/:id/",
    alias: "v1_pasteur_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Pasteur,
  },
  {
    method: "get",
    path: "/api/v1/producer/",
    alias: "v1_producer_list",
    requestFormat: "json",
    response: z.array(Producer),
  },
  {
    method: "post",
    path: "/api/v1/producer/",
    alias: "v1_producer_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Producer,
      },
    ],
    response: Producer,
  },
  {
    method: "get",
    path: "/api/v1/producer/:id/",
    alias: "v1_producer_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Producer,
  },
  {
    method: "put",
    path: "/api/v1/producer/:id/",
    alias: "v1_producer_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Producer,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Producer,
  },
  {
    method: "patch",
    path: "/api/v1/producer/:id/",
    alias: "v1_producer_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedProducer,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Producer,
  },
  {
    method: "delete",
    path: "/api/v1/producer/:id/",
    alias: "v1_producer_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/v1/product-definition/",
    alias: "v1_product_definition_list",
    requestFormat: "json",
    response: z.array(ProductDefinition),
  },
  {
    method: "get",
    path: "/api/v1/product-definition/:id/",
    alias: "v1_product_definition_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: ProductDefinition,
  },
  {
    method: "get",
    path: "/api/v1/profile/",
    alias: "v1_profile_retrieve",
    requestFormat: "json",
    response: Profile,
  },
  {
    method: "put",
    path: "/api/v1/profile/",
    alias: "v1_profile_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Profile,
      },
    ],
    response: Profile,
  },
  {
    method: "patch",
    path: "/api/v1/profile/",
    alias: "v1_profile_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedProfile,
      },
    ],
    response: Profile,
  },
  {
    method: "delete",
    path: "/api/v1/profile/",
    alias: "v1_profile_destroy",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/v1/storage/",
    alias: "v1_storage_list",
    requestFormat: "json",
    response: z.array(Storage),
  },
  {
    method: "post",
    path: "/api/v1/storage/",
    alias: "v1_storage_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Storage,
      },
    ],
    response: Storage,
  },
  {
    method: "get",
    path: "/api/v1/storage/:id/",
    alias: "v1_storage_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Storage,
  },
  {
    method: "put",
    path: "/api/v1/storage/:id/",
    alias: "v1_storage_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Storage,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Storage,
  },
  {
    method: "patch",
    path: "/api/v1/storage/:id/",
    alias: "v1_storage_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedStorage,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Storage,
  },
  {
    method: "delete",
    path: "/api/v1/storage/:id/",
    alias: "v1_storage_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
