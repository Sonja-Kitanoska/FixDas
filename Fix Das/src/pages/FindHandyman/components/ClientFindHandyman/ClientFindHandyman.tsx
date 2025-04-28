import { useState } from "react";
import Footer from "../../../../components/Footer/Footer";
import HandymanCard from "../../../../components/HandymanCard/HandymanCard";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import FindAndBookHandyman from "../../../LandingPage/components/FindAndBookHandyman/FindAndBookHandyman";

const handymen = [
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client1.svg",
		name: "Klaus Schneider",
		location: "Berlin, Germany",
		stars: 5,
		numberReviews: 38,
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
	},
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client1.svg",
		name: "Klaus Schneider",
		location: "Berlin, Germany",
		stars: 5,
		numberReviews: 38,
		categories: [
			"Heating",
			"Sanitary",
			"A/C",
			"Solar systems",
			"Heating",
			"Sanitary",
			"A/C",
			"Solar systems",
		],
		description:
			"I am free around noon to work . .. If you use a section of Lorem Ipsum, you have to make sure that nothing is hidden in the middle of the text .",
		workImages: [
			"/LandingPage/testimonials/work-images/work1.svg",
			"/LandingPage/testimonials/work-images/work2.svg",
			"/LandingPage/testimonials/work-images/work3.svg",
			"/LandingPage/testimonials/work-images/work4.svg",
		],
		createdAt: "5 days ago",
	},
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client1.svg",
		name: "Klaus Schneider",
		location: "Berlin, Germany",
		stars: 5,
		numberReviews: 38,
		categories: [
			"Heating",
			"Sanitary",
			"A/C",
			"Solar systems",
			"Heating",
			"Sanitary",
			"A/C",
			"Solar systems",
		],
		description:
			"I am free around noon to work . .. If you use a section of Lorem Ipsum, you have to make sure that nothing is hidden in the middle of the text .",
		workImages: [
			"/LandingPage/testimonials/work-images/work1.svg",
			"/LandingPage/testimonials/work-images/work2.svg",
			"/LandingPage/testimonials/work-images/work3.svg",
			"/LandingPage/testimonials/work-images/work4.svg",
		],
		createdAt: "5 days ago",
	},
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client1.svg",
		name: "Klaus Schneider",
		location: "Berlin, Germany",
		stars: 5,
		numberReviews: 38,
		categories: [
			"Heating",
			"Sanitary",
			"A/C",
			"Solar systems",
			"Heating",
			"Sanitary",
			"A/C",
			"Solar systems",
		],
		description:
			"I am free around noon to work . .. If you use a section of Lorem Ipsum, you have to make sure that nothing is hidden in the middle of the text .",
		workImages: [
			"/LandingPage/testimonials/work-images/work1.svg",
			"/LandingPage/testimonials/work-images/work2.svg",
			"/LandingPage/testimonials/work-images/work3.svg",
			"/LandingPage/testimonials/work-images/work4.svg",
		],
		createdAt: "5 days ago",
	},
];
const ClientFindHandyman = () => {
	const [visibleCount, setVisibleCount] = useState(3);

	const handleSeeMore = () => {
		setVisibleCount((prev) => prev + 3);
	};
	return (
		<>
			<div className="container">
				<SearchBar />
			</div>
			<div className="py-3 pt-3 container">
				{handymen.slice(0, visibleCount).map((handyman) => (
					<HandymanCard key={handyman.id} handyman={handyman} />
				))}
			</div>

			{visibleCount < handymen.length && (
				<div className="mt-3 d-flex justify-content-center">
					<button
						onClick={handleSeeMore}
						className="orange-border-btn"
						style={{ width: "100px" }}
					>
						See More
					</button>
				</div>
			)}
			<FindAndBookHandyman />

			<Footer />
		</>
	);
};

export default ClientFindHandyman;
