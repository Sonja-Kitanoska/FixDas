import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";
import { useNavigate } from "react-router-dom";
import CompletedCard from "../components/CompletedCard";

const CompletedBookings = () => {
	const navigate = useNavigate();
	return (
		<div style={{ paddingBottom: "78px", height: "100vh" }}>
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
						className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}
					>
						Completed
					</p>
				</div>

				<CompletedCard />
			</div>
			<Navbar />
		</div>
	);
};

export default CompletedBookings;
