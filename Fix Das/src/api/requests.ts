import { ClientRequest } from "../types/types";

const BASE_URL = "http://localhost:5000";

export const postRequest = async (request: ClientRequest) => {
	try {
		const response = await fetch(`${BASE_URL}/requests`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			throw new Error("Failed to post the request");
		}
	} catch (error) {
		console.error(error);
	}
};
