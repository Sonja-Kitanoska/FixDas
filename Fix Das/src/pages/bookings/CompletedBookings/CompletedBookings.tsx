import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";
import { useNavigate } from "react-router-dom";
import CompletedCard from "../components/CompletedCard";
import { useEffect, useState } from "react";
import { Proposal } from "../../../types/types";
import { fetchProposals } from "../../../api/proposals";
import { useUserStore } from "../../../store/userStore";

const CompletedBookings = () => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	const [proposals, setProposals] = useState<Proposal[]>([]);

	useEffect(() => {
		if (!user) return;

		const getProposals = async () => {
			const data = await fetchProposals(user.id);
			setProposals(data);
		};

		getProposals();
	}, [user]);

	return (
		<div style={{ paddingBottom: "78px", minHeight: "100vh" }}>
			<div className="container py-3">
				<div className="d-flex justify-content-between align-items-center py-2">
					<h3 className="orange">My bookings</h3>
					<img src="/notification-icon.svg" alt="Notiffication icon" />
				</div>
				<div
					className={`d-flex justify-content-between mt-3 py-2 ${styles.grayFont}`}
				>
					<p
						onClick={() => navigate("/bookings")}
						className="font-size-14 font-weight-500"
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
						className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}
					>
						Completed
					</p>
				</div>
				<div className="d-flex flex-column gap-2">
					{proposals.filter((proposal) => proposal.status === "completed")
						.length === 0 ? (
						<p className="mt-4 text-center">No completed jobs at the moment.</p>
					) : (
						proposals
							.filter((proposal) => proposal.status === "completed")
							.map((proposal) => (
								<CompletedCard key={proposal.id} proposal={proposal} />
							))
					)}
				</div>
			</div>
			<Navbar />
		</div>
	);
};

export default CompletedBookings;
