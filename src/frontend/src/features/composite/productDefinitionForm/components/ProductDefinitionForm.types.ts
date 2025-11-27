import type { ProductDefinition } from "../../../domain/productDefinition/types";

export interface ProductDefinitionFormProps {
	productDefinition: ProductDefinition | null;
	productDefinitionTypeOptions: { id: string; value: string }[];
}
