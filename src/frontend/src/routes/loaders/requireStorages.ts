import { toast } from "react-toastify";
import { getStorages } from "../../api/storage";


export interface RequireStoragesData {
    uuid: string;
    name: string;
    type: string;
}

const requireStorages = async (): Promise<RequireStoragesData[]> => {
    try {
        const getStoragesResponse = await getStorages();
        if (!getStoragesResponse.response.ok) {
            toast.error("Termelők betöltése sikertelen.");
        }
        const StoragesData = await getStoragesResponse.response.json();
        return StoragesData
    } catch {
        throw toast.error("Termelők betöltése sikertelen.");
    }
}

export default requireStorages;