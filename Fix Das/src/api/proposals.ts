import { Proposal } from "../types/types";

const BASE_URL = "http://localhost:5000";

//fetch proposals
export const fetchProposals = async (userId: string) => {
	try {
		const response = await fetch(`${BASE_URL}/proposals`);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data: Proposal[] = await response.json();

		const proposals = data.filter((p) => p.to.id === userId);
		return proposals;
	} catch (error) {
		console.error("Error fetching proposals:", error);
		return [];
	}
};

// get proposal by id
export const getProposalById = async (proposalId: string) => {
	try {
		const response = await fetch(`${BASE_URL}/proposals/${proposalId}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch proposal with ID ${proposalId}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching proposal:", error);
		throw error;
	}
};

// delete proposal
export const deleteProposal = async (proposalId: number) => {
	try {
		const response = await fetch(`${BASE_URL}/proposals/${proposalId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete proposal");
		}
		return response.json();
	} catch (error) {
		console.error("Error deleting proposal:", error);
		throw error;
	}
};

// update proposal status
export const updateProposalStatus = async (proposal: Proposal) => {
	try {
		const response = await fetch(`${BASE_URL}/proposals/${proposal.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...proposal, status: "accepted" }),
		});

		if (!response.ok) {
			throw new Error("Failed to update proposal status");
		}
	} catch (error) {
		console.error(error);
	}
};
