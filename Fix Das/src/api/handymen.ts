import { Handyman } from "../types/types";

const BASE_URL = "http://localhost:5000";

export const fetchHandymen = async (): Promise<Handyman[]> => {
	try {
		const response = await fetch(`${BASE_URL}/handymen`);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const data: Handyman[] = await response.json();
		return data;
	} catch (err) {
		console.error("Error fetching handymen:", err);
		return [];
	}
};
