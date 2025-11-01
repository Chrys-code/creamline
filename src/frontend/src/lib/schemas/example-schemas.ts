import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Login = z.object({ email: z.string().email(), password: z.string() }).passthrough();
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
const PaginatedMilkList = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(Milk),
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
const PasteurisedMilk = z
	.object({
		uuid: z.string().uuid(),
		pasteur: z.string().uuid(),
		pasteur_uuid: z.string().optional(),
		pasteur_name: z.string().optional(),
		product_definition: z.string().uuid(),
		product_definition_uuid: z.string().optional(),
		product_definition_name: z.string().optional(),
		source_storage: z.string().uuid(),
		source_storage_name: z.string().optional(),
		source_storage_uuid: z.string().optional(),
		source_storage_type: z.string().optional(),
		target_storage: z.string().uuid(),
		target_storage_name: z.string().optional(),
		target_storage_uuid: z.string().optional(),
		target_storage_type: z.string().optional(),
		volume_kg: z.number().gte(1),
		volume_liters: z.number().gte(1),
		temperature: z.number().gte(-273.15),
		start_date: z.string().datetime({ offset: true }),
		end_date: z.string().datetime({ offset: true }),
		created_at: z.string().datetime({ offset: true }),
		updated_at: z.string().datetime({ offset: true }),
		deleted_at: z.string().datetime({ offset: true }).nullable(),
	})
	.passthrough();
const PaginatedPasteurisedMilkList = z
	.object({
		count: z.number().int(),
		next: z.string().url().nullish(),
		previous: z.string().url().nullish(),
		results: z.array(PasteurisedMilk),
	})
	.passthrough();
const PatchedPasteurisedMilk = z
	.object({
		uuid: z.string().uuid(),
		pasteur: z.string().uuid(),
		pasteur_uuid: z.string(),
		pasteur_name: z.string(),
		product_definition: z.string().uuid(),
		product_definition_uuid: z.string(),
		product_definition_name: z.string(),
		source_storage: z.string().uuid(),
		source_storage_name: z.string(),
		source_storage_uuid: z.string(),
		source_storage_type: z.string(),
		target_storage: z.string().uuid(),
		target_storage_name: z.string(),
		target_storage_uuid: z.string(),
		target_storage_type: z.string(),
		volume_kg: z.number().gte(1),
		volume_liters: z.number().gte(1),
		temperature: z.number().gte(-273.15),
		start_date: z.string().datetime({ offset: true }),
		end_date: z.string().datetime({ offset: true }),
		created_at: z.string().datetime({ offset: true }),
		updated_at: z.string().datetime({ offset: true }),
		deleted_at: z.string().datetime({ offset: true }).nullable(),
	})
	.partial()
	.passthrough();
const Producer = z
	.object({
		uuid: z.string().uuid(),
		name: z.string().max(255),
		address: z.string().max(100),
		contact_email: z.string().max(256).email().nullish(),
		created_at: z.string().datetime({ offset: true }),
		updated_at: z.string().datetime({ offset: true }),
		deleted_at: z.string().datetime({ offset: true }).nullable(),
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
const ProductDefinitionTypeEnum = z.enum(["CREAM", "WHOLE MILK", "SKIMMED MILK"]);
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
const User = z
	.object({
		uuid: z.string().uuid(),
		email: z.string().max(255).email(),
		password: z.string(),
		groups: z.array(z.string()),
		is_active: z.boolean().optional(),
		is_staff: z.boolean(),
		profile: Profile,
	})
	.passthrough();
const PatchedUser = z
	.object({
		uuid: z.string().uuid(),
		email: z.string().max(255).email(),
		password: z.string(),
		groups: z.array(z.string()),
		is_active: z.boolean(),
		is_staff: z.boolean(),
		profile: Profile,
	})
	.partial()
	.passthrough();

export const schemas = {
	Login,
	Milk,
	PaginatedMilkList,
	PatchedMilk,
	Pasteur,
	PasteurisedMilk,
	PaginatedPasteurisedMilkList,
	PatchedPasteurisedMilk,
	Producer,
	PatchedProducer,
	ProductDefinitionTypeEnum,
	ProductDefinition,
	Profile,
	PatchedProfile,
	StorageTypeEnum,
	Storage,
	PatchedStorage,
	User,
	PatchedUser,
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
		path: "/api/roles/",
		alias: "roles_retrieve",
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
		method: "get",
		path: "/api/v1/milk/",
		alias: "v1_milk_list",
		requestFormat: "json",
		parameters: [
			{
				name: "page",
				type: "Query",
				schema: z.number().int().optional(),
			},
			{
				name: "page_size",
				type: "Query",
				schema: z.number().int().optional(),
			},
		],
		response: PaginatedMilkList,
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
		path: "/api/v1/milk/:uuid/",
		alias: "v1_milk_retrieve",
		requestFormat: "json",
		parameters: [
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: Milk,
	},
	{
		method: "put",
		path: "/api/v1/milk/:uuid/",
		alias: "v1_milk_update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: Milk,
			},
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: Milk,
	},
	{
		method: "patch",
		path: "/api/v1/milk/:uuid/",
		alias: "v1_milk_partial_update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: PatchedMilk,
			},
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: Milk,
	},
	{
		method: "delete",
		path: "/api/v1/milk/:uuid/",
		alias: "v1_milk_destroy",
		requestFormat: "json",
		parameters: [
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
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
		path: "/api/v1/pasteurised-milk/",
		alias: "v1_pasteurised_milk_list",
		requestFormat: "json",
		parameters: [
			{
				name: "page",
				type: "Query",
				schema: z.number().int().optional(),
			},
			{
				name: "page_size",
				type: "Query",
				schema: z.number().int().optional(),
			},
		],
		response: PaginatedPasteurisedMilkList,
	},
	{
		method: "post",
		path: "/api/v1/pasteurised-milk/",
		alias: "v1_pasteurised_milk_create",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: PasteurisedMilk,
			},
		],
		response: PasteurisedMilk,
	},
	{
		method: "get",
		path: "/api/v1/pasteurised-milk/:uuid/",
		alias: "v1_pasteurised_milk_retrieve",
		requestFormat: "json",
		parameters: [
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: PasteurisedMilk,
	},
	{
		method: "put",
		path: "/api/v1/pasteurised-milk/:uuid/",
		alias: "v1_pasteurised_milk_update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: PasteurisedMilk,
			},
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: PasteurisedMilk,
	},
	{
		method: "patch",
		path: "/api/v1/pasteurised-milk/:uuid/",
		alias: "v1_pasteurised_milk_partial_update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: PatchedPasteurisedMilk,
			},
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: PasteurisedMilk,
	},
	{
		method: "delete",
		path: "/api/v1/pasteurised-milk/:uuid/",
		alias: "v1_pasteurised_milk_destroy",
		requestFormat: "json",
		parameters: [
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: z.void(),
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
	{
		method: "get",
		path: "/api/v1/users/",
		alias: "v1_users_list",
		requestFormat: "json",
		response: z.array(User),
	},
	{
		method: "post",
		path: "/api/v1/users/",
		alias: "v1_users_create",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: User,
			},
		],
		response: User,
	},
	{
		method: "get",
		path: "/api/v1/users/:uuid/",
		alias: "v1_users_retrieve",
		requestFormat: "json",
		parameters: [
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: User,
	},
	{
		method: "put",
		path: "/api/v1/users/:uuid/",
		alias: "v1_users_update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: User,
			},
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: User,
	},
	{
		method: "patch",
		path: "/api/v1/users/:uuid/",
		alias: "v1_users_partial_update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: PatchedUser,
			},
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: User,
	},
	{
		method: "delete",
		path: "/api/v1/users/:uuid/",
		alias: "v1_users_destroy",
		requestFormat: "json",
		parameters: [
			{
				name: "uuid",
				type: "Path",
				schema: z.string().uuid(),
			},
		],
		response: z.void(),
	},
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
