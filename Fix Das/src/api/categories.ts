import { Category } from "../types/types";

const BASE_URL = "http://localhost:5000";

export const fetchCategories = async (): Promise<Category[]> => {
	try {
		const response = await fetch(`${BASE_URL}/categories`);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const data: Category[] = await response.json();
		return data;
	} catch (err) {
		console.error("Error fetching categories:", err);
		return [];
	}
};
