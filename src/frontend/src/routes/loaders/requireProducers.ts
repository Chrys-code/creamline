import { toast } from "react-toastify";
import { getProducers } from "../../api/producer";

const requireProducers = async () => {
	const getProducersResponse = await getProducers();
	if (!getProducersResponse.ok) {
		toast.error("Termelők betöltése sikertelen.");
	}

	const producersData = await getProducersResponse.json();
	return { producers: producersData }
}

export default requireProducers;