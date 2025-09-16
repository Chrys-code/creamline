import { toast } from "react-toastify";
import { getStorages } from "../../api/storage";


export interface RequireStoragesData {
    uuid: string;
    name: string;
    type: string;
}

const requireStorages = async (): Promise<RequireStoragesData[]> => {
    const getStoragesResponse = await getStorages();
    if (!getStoragesResponse.ok) {
        toast.error("Termelők betöltése sikertelen.");
    }

    const StoragesData = await getStoragesResponse.json();
    return StoragesData
}

export default requireStorages;