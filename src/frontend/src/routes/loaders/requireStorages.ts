import { toast } from "react-toastify";
import { api } from "../../api/axios";

export interface RequireStoragesData {
	uuid: string;
	name: string;
	type: string;
}

const requireStorages = async (): Promise<RequireStoragesData[]> => {
	try {
		const storageResponse = await api.get("/api/v1/storage/");
		return storageResponse;
	} catch {
		throw toast.error("Termelők betöltése sikertelen.");
	}
};

export default requireStorages;
