import { Testimonial } from "../types/types";

const BASE_URL = "http://localhost:5000";

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
	try {
		const response = await fetch(`${BASE_URL}/testimonials`);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const data: Testimonial[] = await response.json();
		return data;
	} catch (err) {
		console.error("Error fetching testimonials:", err);
		return [];
	}
};
