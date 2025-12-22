import type { Pasteur } from "../types";

/**
 * Used to adapt Pasteurs to generic dropdown options
 * @param pasteurs Pasteur
 * @returns id, value pairs in array
 */
export const adaptPasteursToPasteurOptions = (pasteurs: Pasteur[]) => {
	if (!pasteurs || !pasteurs.length) return [];
	if (!Array.isArray(pasteurs)) return [];

	return pasteurs.map((pasteur) => ({ id: pasteur.uuid, value: pasteur.name }));
};
