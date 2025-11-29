export const getOffsetDate = (delta: number = 0) => {
	if (typeof delta !== "number") return new Date().toISOString().split("T")[0];

	const today = new Date();
	const offsetDate = new Date();

	offsetDate.setDate(today.getDate() + delta);

	return offsetDate.toISOString().split("T")[0];
};
