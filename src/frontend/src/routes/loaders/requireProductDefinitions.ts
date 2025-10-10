import type { ProductDefinition } from "../../api/types";

import { toast } from "react-toastify";
import { api } from "../../api/axios";

const requireProductDefinitions = async (): Promise<ProductDefinition[]> => {
	try {
		const productDefinitionResponse = await api.get("/api/v1/product-definition/");
		return productDefinitionResponse;
	} catch {
		throw toast.error("Termékminták betöltése sikertelen.");
	}
};

export default requireProductDefinitions;
