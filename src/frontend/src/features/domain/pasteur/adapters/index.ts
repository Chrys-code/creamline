import type { Pasteur } from "../types";

export const adaptPasteursToPasteurOptions = (pasteurs: Pasteur[]) => {
	if (!pasteurs || !pasteurs.length) return [];
	if (!Array.isArray(pasteurs)) return [];

	return pasteurs.map((pasteur) => ({ id: pasteur.uuid, value: pasteur.name }));
};
