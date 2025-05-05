import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";
import { useEffect, useState } from "react";
import { fetchProposals } from "../../../api/proposals";
import { Proposal } from "../../../types/types";
import { useUserStore } from "../../../store/userStore";
import OngoingCard from "../components/OngoingCard";
import { useNavigate } from "react-router-dom";

const OngoingBooking = () => {
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

	return (
		<>
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
						className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}
					>
						Ongoing
					</p>
					<p
						onClick={() => navigate("/bookings/review")}
						className="font-size-14 font-weight-500"
					>
						Completed
					</p>
				</div>
				<div className="d-flex flex-column gap-2">
					{proposals
						.filter((proposal) => proposal.status === "accepted")
						.map((proposal) => (
							<OngoingCard key={proposal.id} proposal={proposal} />
						))}
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default OngoingBooking;
