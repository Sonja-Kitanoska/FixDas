import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Review = () => {
	const navigate = useNavigate();
	return (
		<div className="container py-3">
			<div className="d-flex gap-3 align-items-center ">
				<IoChevronBack
					style={{ fontSize: "20px" }}
					onClick={() => navigate("bookings/ongoing")}
				/>

				<p className="mb-0 font-size-18 font-weight-400">Leave a review</p>
			</div>

			<p className="font-size-12 py-4">
				Please rate the craftsman and the performance before continuing
			</p>

			<p className="font-size-14">
				Rate your service with <span className="fw-bold">Klaus ...</span>
			</p>

			<p>STARS</p>

			<p className="font-size-14 font-weight-400">Share your experience</p>
			<textarea
				name="comment"
				id="comment"
				rows={5}
				placeholder="Enter message"
				className="w-100"
			></textarea>
			<form className="py-3 d-flex gap-2">
				<input type="checkbox" name="agree" />
				<label className="font-size-12 font-weight-400">
					I agree that my assesment is published
				</label>
			</form>
			<button className="orange-btn">Send evaluation</button>
			<Navbar />
		</div>
	);
};

export default Review;
