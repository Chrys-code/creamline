import { toast } from "react-toastify";
import { api } from "../../api/axios";

export interface RequireProducersData {
	uuid: string;
	name: string;
	address: string;
	contactEmail: string;
}

const requireProducers = async (): Promise<RequireProducersData[]> => {
	try {
		const producerResponse = await api.get("/api/v1/producer/");
		return producerResponse;
	} catch {
		throw toast.error("Termelők betöltése sikertelen.");
	}
};

export default requireProducers;
