import { useEffect, useState } from "react";
import { Category } from "../types/types";

const useCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("http://localhost:5000/categories");
				const data: Category[] = await response.json();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	return categories;
};

export default useCategories;
