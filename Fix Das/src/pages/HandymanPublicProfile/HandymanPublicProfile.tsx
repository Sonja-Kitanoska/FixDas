import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import FeedbackForHandyman from "./components/FeedbackForHandyman/FeedbackForHandyman";
import HandymansPostedAdds from "./components/HandymansPostedAdds/HandymansPostedAdds";
import SimilarProfiles from "./components/SimilarProfiles/SimilarProfiles";
import HandymanInfo from "./components/HandymanInfo/HandymanInfo";
import CurrentJobs from "./components/CurrentJobs/CurrentJobs";
import { useParams } from "react-router-dom";
import { fetchHandymanById } from "../../api/handymen";
import { useEffect, useState } from "react";
import { Handyman, ReviewFormData } from "../../types/types";
import { fetchReviewsByHandymanId } from "../../api/fedbacksForHandman";

const HandymanPublicProfile = () => {
	const { handymanId } = useParams();
	const [handyman, setHandyman] = useState<Handyman | null>(null);
	const [feedbacks, setFeedbacks] = useState<ReviewFormData[] | null>(null);

	useEffect(() => {
		const getHandyman = async () => {
			if (handymanId) {
				const data = await fetchHandymanById(handymanId);
				setHandyman(data);
			}
		};

		getHandyman();
	}, [handymanId]);

	useEffect(() => {
		const getFeedbacksForHandyman = async () => {
			if (handymanId) {
				const data: ReviewFormData[] = await fetchReviewsByHandymanId(
					handymanId
				);
				setFeedbacks(data);
			}
		};

		getFeedbacksForHandyman();
	}, [handymanId]);

	if (!handyman) return <p>Loading handyman profile...</p>;

	return (
		<div style={{ paddingBottom: "76px" }}>
			<div className="py-3 container">
				<div className="d-flex gap-2 align-items-center">
					<IoChevronBack style={{ fontSize: "20px" }} />
					<p className="mb-0">Zurück</p>
				</div>
				<HandymanInfo handyman={handyman} />
				<HandymansPostedAdds />
				<SimilarProfiles />
				<CurrentJobs />
				<FeedbackForHandyman feedbacks={feedbacks || []} />
			</div>
			<Navbar />
		</div>
	);
};

export default HandymanPublicProfile;
