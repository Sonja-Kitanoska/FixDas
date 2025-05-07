import { User } from "../types/types";
const BASE_URL = "http://localhost:5000";

// fetch users
export const fetchUsers = async (): Promise<User[]> => {
	try {
		const response = await fetch(`${BASE_URL}/users`);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const data: User[] = await response.json();
		return data;
	} catch (err) {
		console.error("Error fetching users:", err);
		return [];
	}
};

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

// deleteUser
export const deleteUserData = async (userId: string) => {
	try {
		const response = await fetch(`${BASE_URL}/users/${userId}`, {
			method: "DELETE",
		});

		if (response.ok) {
			console.log("User deleted from JSON Server");
		} else {
			console.error("Error deleting user from JSON Server");
		}
	} catch (error) {
		console.error("Error deleting user from JSON Server", error);
	}
};

// update user
export const updateUser = async (userId: string, updatedData: User) => {
	try {
		const response = await fetch(`${BASE_URL}/users/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		console.log("User updated:", result);
		return result;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Failed to update user:", error.message);
		}
	}
};
