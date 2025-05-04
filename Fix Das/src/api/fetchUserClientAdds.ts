import { ClientAddData } from "../types/types";

const BASE_URL = "http://localhost:5000";

export const fetchUserClientAdds = async (userId: string) => {
	try {
		const response = await fetch(`${BASE_URL}/client-adds`);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data.filter((add: ClientAddData) => add.userId === userId);
	} catch (error) {
		console.error("Error fetching client adds:", error);
		return [];
	}
};
