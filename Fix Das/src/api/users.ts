import { User } from "../types/types";
const BASE_URL = "http://localhost:5000";

// create user

export const createUser = async (userData: User) => {
	try {
		const response = await fetch(`${BASE_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		console.log("User created:", result);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Failed to create user:", error.message);
		}
	}
};
