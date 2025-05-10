import { ReviewFormData } from "../types/types";

const BASE_URL = "http://localhost:5000";

export const fetchReviewsByHandymanId = async (
	handymanId: string
): Promise<ReviewFormData[]> => {
	const response = await fetch(`${BASE_URL}/reviews?handymanId=${handymanId}`);
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}
	const data: ReviewFormData[] = await response.json();
	return data;
};
