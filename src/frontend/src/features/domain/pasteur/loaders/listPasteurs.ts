import { pasteurClient } from "../services/client";

export const listPasteurs = async () => {
	try {
		const pasteursResponse = await pasteurClient.v1_pasteur_list();
		return pasteursResponse;
	} catch (err) {
		throw new Error("Could not get pasteurs" + err);
	}
};
