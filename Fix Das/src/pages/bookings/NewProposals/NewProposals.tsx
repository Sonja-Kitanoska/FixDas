import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";

const NewProposals = () => {
	const navigate = useNavigate();

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
						onClick={() => navigate("/bookings/new-proposals")}
						className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}
					>
						New Proposals (1)
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

				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Plumbing service</h5>
						<p className="card-text">
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</p>
						<div className="d-flex gap-2">
							<button className="btn orange-border-btn">Refuse</button>

							<button className="btn orange-btn">Accept</button>
						</div>
					</div>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default NewProposals;
