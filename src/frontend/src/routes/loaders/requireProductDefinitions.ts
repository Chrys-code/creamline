import { toast } from "react-toastify";
import { getProductDefinitions } from "../../api/productDefinition";


export interface RequireProductDefinitionsData {
    uuid: string;
    name: string;
}

const requireProductDefinitions = async (): Promise<RequireProductDefinitionsData[]> => {
    try {
        const getProductDefinitionsResponse = await getProductDefinitions();
        if (!getProductDefinitionsResponse.response.ok) {
            toast.error("Termékminták betöltése sikertelen.");
        }

        const ProductDefinitionsData = await getProductDefinitionsResponse.response.json();
        return ProductDefinitionsData
    } catch {
        throw toast.error("Termékminták betöltése sikertelen.");
    }
}

export default requireProductDefinitions;