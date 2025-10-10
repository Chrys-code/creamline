import { toast } from "react-toastify";
import { api } from "../../api/axios";

export interface RequirePasteursData {
	uuid: string;
	name: string;
}

const requirePasteurs = async (): Promise<RequirePasteursData[]> => {
	try {
		const pasteursResponse = await api.get("/api/v1/pasteur/");
		return pasteursResponse;
	} catch {
		throw toast.error("Pasztőrök betöltése sikertelen.");
	}
};

export default requirePasteurs;
