const BASE_URL = "http://localhost:5000";

export const fetchReviewByProposalId = async (proposalId: number) => {
	try {
		const response = await fetch(
			`${BASE_URL}/reviews?proposalId=${proposalId}`
		);
		if (!response.ok) throw new Error("Failed to fetch review");

		const data = await response.json();
		return Array.isArray(data) ? data[0] : data;
	} catch (err) {
		console.error("Error fetching review:", err);
		return null;
	}
};
