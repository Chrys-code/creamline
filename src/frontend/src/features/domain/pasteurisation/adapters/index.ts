import type { Pasteur } from "../../pasteur/types";

export const adaptPasteursToPasteurOptions = (pasteurs: Pasteur[]) =>
	pasteurs?.map((pasteur) => ({
		id: pasteur.uuid,
		value: pasteur.name,
	})) || [];
