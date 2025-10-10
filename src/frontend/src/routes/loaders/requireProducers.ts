import type { Producer } from "../../api/types";

import { toast } from "react-toastify";
import { api } from "../../api/axios";

const requireProducers = async (): Promise<Producer[]> => {
	try {
		const producerResponse = await api.get("/api/v1/producer/");
		return producerResponse;
	} catch {
		throw toast.error("Termelők betöltése sikertelen.");
	}
};

export default requireProducers;
