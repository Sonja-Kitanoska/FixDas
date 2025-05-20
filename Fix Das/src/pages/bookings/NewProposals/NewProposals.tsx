import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";
import { useUserStore } from "../../../store/userStore";
import { useEffect, useState } from "react";
import { Proposal } from "../../../types/types";
import ProposalCard from "../components/ProposalCard";
import {
	deleteProposal,
	fetchProposals,
	updateProposalStatus,
} from "../../../api/proposals";
import { useNavigate } from "react-router-dom";

const NewProposals = () => {
	const user = useUserStore((state) => state.user);
	const [proposals, setProposals] = useState<Proposal[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return;

		const getProposals = async () => {
			const data = await fetchProposals(user.id);
			setProposals(data);
		};

		getProposals();
	}, [user]);

	const handleDeleteProposal = async (id: number) => {
		try {
			await deleteProposal(id);
			setProposals((prevProposals) =>
				prevProposals.filter((proposal) => proposal.id !== id)
			);
		} catch (error) {
			console.error("Failed to delete proposal from server", error);
		}
	};

	return (
		<>
			<div
				style={{ paddingBottom: "83px", minHeight: "100vh" }}
				className="container"
			>
				<div className="container">
					<div className="d-flex justify-content-between align-items-center py-2">
						<h3 className="orange">My bookings</h3>
						<img src="/notification-icon.svg" alt="Notiffication icon" />
					</div>
					<div
						className={`d-flex justify-content-between mt-3 py-2 ${styles.grayFont}`}
					>
						<p
							onClick={() => navigate("/bookings")}
							className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}
						>
							New Proposals (
							{proposals.filter((p) => p.status === "pending").length})
						</p>
						<p
							onClick={() => navigate("/bookings/ongoing")}
							className="font-size-14 font-weight-500"
						>
							Ongoing
						</p>
						<p
							onClick={() => navigate("/bookings/completed")}
							className="font-size-14 font-weight-500"
						>
							Completed
						</p>
					</div>
					<div className="d-flex flex-column gap-2">
						{proposals.length === 0 ? (
							<p className="mt-4 text-center">
								No new proposals at the moment.
							</p>
						) : (
							proposals
								.filter((proposal) => proposal.status === "pending")
								.map((proposal) => (
									<ProposalCard
										key={proposal.id}
										proposal={proposal}
										onDelete={handleDeleteProposal}
										updateProposal={async () =>
											await updateProposalStatus(proposal, "accepted")
										}
									/>
								))
						)}
					</div>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default NewProposals;
