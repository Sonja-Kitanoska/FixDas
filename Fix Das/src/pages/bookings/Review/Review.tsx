import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import BasicRating from "./components/Rating/Rating";
import { postReview } from "../../../api/postReview";
import { getProposalById } from "../../../api/proposals";
import { Proposal } from "../../../types/types";
import { useUserStore } from "../../../store/userStore";
import { fetchHandymanById, handymanRatingUpdate } from "../../../api/handymen";
import styles from "./Review.module.css";

const Review = () => {
	const navigate = useNavigate();
	const { proposalId } = useParams();
	const user = useUserStore((state) => state.user);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const commentRef = useRef<HTMLTextAreaElement>(null);
	const [rating, setRating] = useState<number | null>(0);
	const [agreedToPublish, setAgreedToPublish] = useState(false);
	const [handymanId, setHandymanId] = useState<string | null>(null);
	const [proposal, setProposal] = useState<Proposal | null>(null);
	const [loading, setLoading] = useState(true);
	const [commentError, setCommentError] = useState("");
	const [ratingError, setRatingError] = useState("");

	useEffect(() => {
		const fetchHandymanId = async () => {
			try {
				if (!proposalId) return;
				const proposal: Proposal = await getProposalById(proposalId);
				setProposal(proposal);
				setHandymanId(proposal.from.id);
			} catch (err) {
				console.error("Failed to fetch proposal details:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchHandymanId();
	}, [proposalId]);

	const handleAddPhotosClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		let isValid = true;

		if (!handymanId) {
			console.error("Cannot submit review without handymanId");
			return;
		}

		setCommentError("");
		setRatingError("");

		const comment = commentRef.current?.value.trim();

		if (!rating || rating === 0) {
			setRatingError("Rating is required.");
			isValid = false;
		}
		if (!comment) {
			setCommentError("Comment is required.");
			isValid = false;
		}

		if (!isValid) return;

		const formData = {
			id: crypto.randomUUID(),
			handymanId,
			proposalId: proposal?.id ?? null,
			name: proposal?.from?.name ?? "",
			rating: rating?.toString() ?? null,
			comment: commentRef.current?.value ?? null,
			photos: [] as File[],
			agreedToPublish,
			from: {
				name: user?.username ?? "Anonymous",
				id: user?.id ?? "",
				location: user?.location,
			},
		};

		if (fileInputRef.current?.files) {
			Array.from(fileInputRef.current.files).forEach((file) => {
				formData.photos.push(file);
			});
		}

		try {
			await postReview(formData);
			if (rating !== null && handymanId) {
				const handyman = await fetchHandymanById(handymanId);

				if (handyman?.stars != null) {
					const currentRating = handyman.stars;
					const averageRating = (currentRating + rating) / 2;

					if (handyman) {
						const updatedHandyman = {
							...handyman,
							stars: averageRating,
						};
						await handymanRatingUpdate(handymanId, updatedHandyman);
					}
					console.log("Handyman rating updated to:", averageRating);
				}
			}

			navigate("/bookings/completed");
		} catch (err) {
			console.error("Failed to submit review:", err);
		}
	};

	if (loading) return <p>Loading...</p>;
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
					Rate your service with
					<span className="fw-bold"> {proposal?.from.name}</span>
				</p>

				<form onSubmit={handleSubmit}>
					<div className="d-flex flex-column align-items-center py-3 justify-content-center">
						<BasicRating rating={rating} setRating={setRating} />
						{ratingError && (
							<p className="text-danger font-size-12 mt-1 mb-0">
								{ratingError}
							</p>
						)}
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
						onChange={() => setCommentError("")}
					></textarea>
					{commentError && (
						<span className="text-danger font-size-12">{commentError}</span>
					)}
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

					<div className="py-3 pt-2 d-flex align-items-center gap-2">
						<input
							type="checkbox"
							name="agree"
							className={`${styles.checkboxInput} form-check-input mt-0`}
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
