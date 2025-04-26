import Navbar from "../../../components/Navbar/Navbar";
import styles from "../Bookings.module.css";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendarCheck, FaStar } from "react-icons/fa6";
import { PiArrowsClockwiseFill, PiUserGearLight } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";

const CompletedBookings = () => {
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
				<p className="font-size-14 font-weight-500">Ongoing</p>
				<p
					className={`font-size-14 font-weight-500 orange ${styles.orangeBorder}`}
				>
					Completed
				</p>
			</div>

			<div className="card" style={{ borderColor: "#38830A" }}>
				<div className="card-body">
					<div className="d-flex justify-content-between border-bottom py-1">
						<h5 className="card-title font-size-14 font-weight-700">
							Plumbing service
						</h5>
						<div className="d-flex align-items-center gap-1">
							<FaStar className="orange" />
							<p className="mb-0 font-size-12 font-weight-400">
								You rated 4.5/5
							</p>
							<FaRegCheckCircle style={{ color: "#38830A" }} />
						</div>
					</div>

					<div className="d-flex justify-content-between py-3 font-size-12 font-weight-400">
						<div className="f-flex flex-column">
							<div className="d-flex align-items-center gap-2 mb-2">
								<FaRegCalendarCheck className="orange font-size-14" />
								<p className="mb-0">Wed, 8 Nov</p>
							</div>
							<div className="d-flex align-items-center mb-2 gap-2">
								<PiArrowsClockwiseFill
									className="orange"
									size={15}
									strokeWidth={12}
								/>
								<p className="mb-0">Fix a leaking pipe</p>
							</div>
							<div className="d-flex align-items-center mb-2 gap-2">
								<PiUserGearLight
									className="orange"
									size={15}
									strokeWidth={12}
								/>
								<p className="mb-0">Klaus Schneider</p>
							</div>
						</div>
						<div>
							<div className="d-flex gap-2 align-items-center mb-1">
								<LuClock3 className="orange" size={15} />
								<p className="mb-0">Morning 9 am</p>
							</div>
						</div>
					</div>

					<div className="d-flex gap-2">
						<button className="btn orange-border-btn">Chat now</button>

						<button className="btn orange-btn">Reopen</button>
					</div>
				</div>
			</div>

			<Navbar />
		</div>
	);
};

export default CompletedBookings;
