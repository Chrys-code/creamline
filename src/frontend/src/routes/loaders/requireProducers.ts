import { toast } from "react-toastify";
import { getProducers } from "../../api/producer";


export interface RequireProducersData {
	uuid: string;
	name: string;
	address: string;
	contactEmail: string;
}

const requireProducers = async (): Promise<RequireProducersData[]> => {
	try {
		const getProducersResponse = await getProducers();
		if (!getProducersResponse.response.ok) {
			toast.error("Termelők betöltése sikertelen.");
		}

		const producersData = await getProducersResponse.response.json();
		return producersData
	} catch {
		throw toast.error("Termelők betöltése sikertelen.");
	}
}

export default requireProducers;