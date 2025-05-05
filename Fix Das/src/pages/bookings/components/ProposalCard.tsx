import { FaRegCalendarCheck } from "react-icons/fa6";
import { LuClock3, LuMapPin } from "react-icons/lu";
import { PiArrowsClockwiseFill, PiUserGearLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Proposal } from "../../../types/types";

const ProposalCard = ({
	proposal,
	onDelete,
	updateProposal,
}: {
	proposal: Proposal;
	onDelete: (id: number) => void;
	updateProposal: (proposal: Proposal) => void;
}) => {
	const navigate = useNavigate();
	return (
		<div className="card">
			<div className="card-body">
				<div className="d-flex justify-content-between border-bottom py-1">
					<h5 className="card-title font-size-14 font-weight-700">
						{proposal.title}
					</h5>
					<div className="d-flex orange align-items-center gap-1">
						<LuMapPin />
						<p className="mb-0 font-size-12 font-weight-600">View on map</p>
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
							<p className="mb-0">{proposal.title}</p>
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
					<button
						onClick={() => onDelete(proposal.id)}
						className="btn orange-border-btn"
					>
						Refuse
					</button>

					<button
						onClick={async () => {
							updateProposal(proposal);
							navigate("/bookings/ongoing");
						}}
						className="btn orange-btn"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProposalCard;
