import type { ProductDefinition } from "../../../types";

export interface ProductDefinitionFormProps {
	productDefinition: ProductDefinition | null;
	productDefinitionTypeOptions: { id: string; value: string }[];
}
