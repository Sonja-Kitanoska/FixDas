import Navbar from "../../components/Navbar/Navbar";

const MyBookings = () => {
	return (
		<div>
			<div className="container-fluid">
				<div className="d-flex justify-content-between align-items-center py-2">
					<h3 className="orange">My bookings</h3>
					<img src="notification-icon.svg" alt="Notiffication icon" />
				</div>
				<div className="d-flex justify-content-between mt-3 gray-font">
					<p className="font-size-14">New Proposals (1)</p>
					<p className="font-size-14">Ongoing</p>
					<p className="font-size-14">Completed</p>
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
		</div>
	);
};

export default MyBookings;
