import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";

const OngoingBooking = () => {
	return (
		<div className="container py-3">
			<div className="d-flex justify-content-between align-items-center py-2">
				<h3 className="orange">My bookings</h3>
				<img src="/notification-icon.svg" alt="Notiffication icon" />
			</div>
			<div
				className={`d-flex justify-content-between mt-3 py-2 ${styles.grayFont}`}
			>
				<p className="font-size-14 font-weight-500">New Proposals (1)</p>
				<p className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}>Ongoing</p>
				<p className="font-size-14 font-weight-500">Completed</p>
			</div>

			<Navbar />
		</div>
	);
};

export default OngoingBooking;
