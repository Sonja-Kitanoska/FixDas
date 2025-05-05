import { FaRegCalendarCheck, FaRegCheckCircle, FaStar } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { PiArrowsClockwiseFill, PiUserGearLight } from "react-icons/pi";
import { Proposal, ReviewFormData } from "../../../types/types";
import { useEffect, useState } from "react";
import { fetchReviewByProposalId } from "../../../api/reviews";

const CompletedCard = ({ proposal }: { proposal: Proposal }) => {
	const [review, setReview] = useState<ReviewFormData | null>(null);

	useEffect(() => {
		const loadReview = async () => {
			const res = await fetchReviewByProposalId(proposal.id);
			setReview(res);
		};
		loadReview();
	}, [proposal.id]);
	return (
		<div className="card" style={{ borderColor: "#38830A" }}>
			<div className="card-body">
				<div className="d-flex justify-content-between align-items-center border-bottom py-2">
					<h5 className="card-title font-size-14 font-weight-700 mb-0">
						{proposal.title}
					</h5>
					<div className="d-flex align-items-center gap-1">
						<FaStar className="orange" />
						<p className="mb-0 font-size-12 font-weight-400">
							You rated {review?.rating}
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
							<p className="mb-0">{proposal.description}</p>
						</div>
						<div className="d-flex align-items-center mb-2 gap-2">
							<PiUserGearLight className="orange" size={15} strokeWidth={12} />
							<p className="mb-0">{proposal.from.name}</p>
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
	);
};

export default CompletedCard;
