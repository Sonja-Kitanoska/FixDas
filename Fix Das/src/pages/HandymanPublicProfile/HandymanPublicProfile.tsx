import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import FeedbackForHandyman from "./components/FeedbackForHandyman/FeedbackForHandyman";
import HandymansPostedAdds from "./components/HandymansPostedAdds/HandymansPostedAdds";
import SimilarProfiles from "./components/SimilarProfiles/SimilarProfiles";
import HandymanInfo from "./components/HandymanInfo/HandymanInfo";
import CurrentJobs from "./components/CurrentJobs/CurrentJobs";
import { useNavigate, useParams } from "react-router-dom";
import {
	fetchHandymanById,
	fetchHandymen,
	fetchHandymenAds,
} from "../../api/handymen";
import { useEffect, useState } from "react";
import { Handyman, HandymanAd, ReviewFormData } from "../../types/types";
import { fetchReviewsByHandymanId } from "../../api/fedbacksForHandman";

const HandymanPublicProfile = () => {
	const { handymanId } = useParams();
	const navigate = useNavigate();
	const [handyman, setHandyman] = useState<Handyman | null>(null);
	const [feedbacks, setFeedbacks] = useState<ReviewFormData[] | null>(null);
	const [handymanAdds, setHandymanAdds] = useState<HandymanAd[]>([]);

	const [handymen, setHandymen] = useState<Handyman[]>([]);

	useEffect(() => {
		const getHandymen = async () => {
			const data: Handyman[] = await fetchHandymen();
			setHandymen(data);
		};
		getHandymen();
	}, []);

	useEffect(() => {
		const getHandymenAds = async () => {
			const handymanAdds = await fetchHandymenAds();
			setHandymanAdds(handymanAdds);
		};

		getHandymenAds();
	}, []);

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

	const similarHandymen = handyman
		? handymen
				.filter(
					(h) =>
						h.id !== handymanId &&
						h.categories.some((category) =>
							handyman.categories.includes(category)
						)
				)
				.slice(0, 3)
		: [];

	const filteredHandymanAdds = handymanAdds.filter(
		(ad) => ad.id === handymanId
	);

	if (!handyman) return <p>Loading handyman profile...</p>;

	return (
		<div style={{ paddingBottom: "76px" }}>
			<div className="py-3 container">
				<div
					className="d-flex gap-2 align-items-center"
					onClick={() => navigate("/homepage")}
				>
					<IoChevronBack style={{ fontSize: "20px" }} />
					<p className="mb-0">Zurück</p>
				</div>
				<HandymanInfo handyman={handyman} />
				<HandymansPostedAdds handymanAdds={filteredHandymanAdds || []} />
				<SimilarProfiles similarHandymen={similarHandymen} />
				<CurrentJobs />
				<FeedbackForHandyman feedbacks={feedbacks || []} />
			</div>
			<Navbar />
		</div>
	);
};

export default HandymanPublicProfile;
