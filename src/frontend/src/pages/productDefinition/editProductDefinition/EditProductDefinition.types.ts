import type { ProductDefinition } from "../../../features/domain/productDefinition/types";

export interface EditProductDefinitionProps {
	productDefinition: ProductDefinition;
	productDefinitionTypeOptions: { id: string; value: string }[];
}
