import { toast } from "react-toastify";
import { getProducers } from "../../api/producer";


export interface RequireProducersData {
	uuid: string;
	name: string;
	address: string;
	contactEmail: string;
}

const requireProducers = async (): Promise<RequireProducersData[]> => {
	const getProducersResponse = await getProducers();
	if (!getProducersResponse.ok) {
		toast.error("Termelők betöltése sikertelen.");
	}

	const producersData = await getProducersResponse.json();
	return producersData
}

export default requireProducers;