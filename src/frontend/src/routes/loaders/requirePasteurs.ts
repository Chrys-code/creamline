import { toast } from "react-toastify";
import { getPasteurs } from "../../api/pasteur";


export interface RequirePasteursData {
    uuid: string;
    name: string;
}

const requirePasteurs = async (): Promise<RequirePasteursData[]> => {
    try {
        const getPasteursResponse = await getPasteurs();
        if (!getPasteursResponse.response.ok) {
            toast.error("Pasztőrök betöltése sikertelen.");
        }

        const PasteursData = await getPasteursResponse.response.json();
        return PasteursData;
    } catch {
        throw toast.error("Pasztőrök betöltése sikertelen.");
    }
};

export default requirePasteurs;