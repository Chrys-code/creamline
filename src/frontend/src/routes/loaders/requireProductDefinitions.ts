import { toast } from "react-toastify";
import { api } from "../../api/axios";

export interface RequireProductDefinitionsData {
	uuid: string;
	name: string;
}

const requireProductDefinitions = async (): Promise<RequireProductDefinitionsData[]> => {
	try {
		const productDefinitionResponse = await api.get("/api/v1/product-definition/");
		return productDefinitionResponse;
	} catch {
		throw toast.error("Termékminták betöltése sikertelen.");
	}
};

export default requireProductDefinitions;
