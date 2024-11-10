
// Helper function to convert BigInt to string in objects
export const replaceBigInts = (obj: any): any => {
	if (obj === null) return null;
	if (typeof obj === "bigint") return obj.toString();
	if (Array.isArray(obj)) return obj.map(replaceBigInts);
	if (typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key, replaceBigInts(value)]),
		);
	}
	return obj;
};