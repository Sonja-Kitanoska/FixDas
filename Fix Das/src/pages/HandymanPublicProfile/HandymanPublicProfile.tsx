import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import FeedbackForHandyman from "./components/FeedbackForHandyman/FeedbackForHandyman";
import HandymansPostedAdds from "./components/HandymansPostedAdds/HandymansPostedAdds";
import SimilarProfiles from "./components/SimilarProfiles/SimilarProfiles";
import HandymanInfo from "./components/HandymanInfo/HandymanInfo";
import CurrentJobs from "./components/CurrentJobs/CurrentJobs";

const handyman = {
	id: crypto.randomUUID(),
	image: "/LandingPage/testimonials/client1.svg",
	name: "Klaus Schneider",
	location: "Rheda-Wiedenbrück",
	stars: 5,
	numberReviews: 38,
	numberJobs: 4,
	categories: ["Heating", "Sanitary", "A/C", "Solar systems"],
	description:
		"I am free around noon to work . .. If you use a section of Lorem Ipsum, you have to make sure that nothing is hidden in the middle of the text .",
	workImages: [
		"/LandingPage/testimonials/work-images/work1.svg",
		"/LandingPage/testimonials/work-images/work2.svg",
		"/LandingPage/testimonials/work-images/work3.svg",
		"/LandingPage/testimonials/work-images/work4.svg",
	],
	createdAt: "5 days ago",
};

const HandymanPublicProfile = () => {
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
				<FeedbackForHandyman />
			</div>
			<Navbar />
		</div>
	);
};

export default HandymanPublicProfile;
