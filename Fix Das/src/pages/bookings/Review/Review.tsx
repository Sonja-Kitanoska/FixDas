import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { useRef, useState } from "react";
import BasicRating from "./components/Rating/Rating";
import { postReview } from "../../../api/postReview";

const Review = () => {
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const commentRef = useRef<HTMLTextAreaElement>(null);
	const [rating, setRating] = useState<number | null>(0);
	const [agreedToPublish, setAgreedToPublish] = useState(false);

	const handleAddPhotosClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const formData = {
			rating: rating?.toString() ?? null,
			comment: commentRef.current?.value ?? null,
			photos: [] as File[],
			agreedToPublish,
		};

		if (fileInputRef.current?.files) {
			Array.from(fileInputRef.current.files).forEach((file) => {
				formData.photos.push(file);
			});
		}

		try {
			const response = await postReview(formData);
			console.log("Review submitted successfully:", response);
			navigate("/bookings/completed");
		} catch (err) {
			console.error("Failed to submit review:", err);
		}
	};
	return (
		<div className="py-3">
			<div style={{ paddingBottom: "78px" }} className="container">
				<div className="d-flex gap-3 align-items-center ">
					<IoChevronBack
						style={{ fontSize: "20px" }}
						onClick={() => navigate("/bookings/ongoing")}
					/>

					<p className="mb-0 font-size-18 font-weight-400">Leave a review</p>
				</div>

				<p className="font-size-12 font-weight-400 py-4">
					Please rate the craftsman and the performance before continuing.
				</p>

				<p className="font-size-14 text-center mb-0">
					Rate your service with <span className="fw-bold">Klaus ...</span>
				</p>

				<form onSubmit={handleSubmit}>
					<div className="d-flex py-3 justify-content-center">
						<BasicRating rating={rating} setRating={setRating} />
					</div>

					<p className="font-size-14 font-weight-400">Share your experience</p>
					<textarea
						name="comment"
						id="comment"
						rows={5}
						ref={commentRef}
						placeholder="Enter message"
						className="w-100 p-2 rounded"
						style={{ borderColor: "#E9E9E9" }}
					></textarea>
					<div
						className="d-flex gap-2 py-3"
						style={{ color: "#FB8133", cursor: "pointer" }}
						onClick={handleAddPhotosClick}
					>
						<FaCamera size={20} />
						<p className="font-size-14 font-weight-400">Add photos</p>
					</div>
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						accept="image/*"
						multiple
					/>

					<div className="py-3 pt-2 d-flex gap-2">
						<input
							type="checkbox"
							name="agree"
							onChange={(e) => {
								setAgreedToPublish(e.target.checked);
							}}
						/>
						<label className="font-size-12 font-weight-400">
							I agree that my assesment is published
						</label>
					</div>
					<button className="orange-btn">Send evaluation</button>
				</form>
			</div>
			<Navbar />
		</div>
	);
};

export default Review;
