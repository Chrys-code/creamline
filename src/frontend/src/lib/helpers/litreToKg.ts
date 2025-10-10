function convertMilkLiterAndKg({ liters, kg }: { liters?: number; kg?: number }): string {
	if (liters) {
		return milkLitersToKg(liters);
	}

	if (kg) {
		return milkKgToLiters(kg);
	}

	return "0";
}

function milkLitersToKg(liters: number): string {
	const density = 1.03; // density of milk (kg/L)
	return (liters * density).toFixed(2);
}

function milkKgToLiters(kg: number): string {
	const density = 1.03; // density of milk (L/kg)
	return (kg / density).toFixed(2);
}

export default convertMilkLiterAndKg;
