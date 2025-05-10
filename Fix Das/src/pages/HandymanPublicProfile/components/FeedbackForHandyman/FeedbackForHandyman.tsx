import { FaStar } from "react-icons/fa6";
import { ReviewFormData } from "../../../../types/types";

const FeedbackForHandyman = ({
	feedbacks,
}: {
	feedbacks: ReviewFormData[];
}) => {
	if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
		return <p>No feedbacks yet.</p>;
	}
	return (
		<div className="py-2">
			<h2 className="font-weight-700 font-size-20">Kunden feedback</h2>
			{feedbacks.map((feedback) => (
				<div key={feedback.id} className="mb-4 font-size-12 py-2">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex align-items-center  gap-2">
							<div
								style={{ width: "40px", height: "40px", borderRadius: "50%" }}
							>
								<img
									src="/PublicProfileHandyman/client.png"
									alt="Client's photo"
									className="w-100 h-100 object-fit-cover"
								/>
							</div>
							<p className="mb-0">{feedback.from.name}</p>
						</div>
						<p className="orange mb-0">{feedback.from.location}</p>
					</div>

					<div className="my-2 d-flex gap-1 ">
						{[...Array(feedback.rating)].map((_, index) => (
							<FaStar key={index} color="#F5CE47" />
						))}
					</div>

					<p className="mb-0">{feedback.comment}</p>
				</div>
			))}
		</div>
	);
};

export default FeedbackForHandyman;
