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
];
const ClientFindHandyman = () => {
	return (
		<>
			<div className="container">
				<SearchBar />
			</div>
			<div className="py-3 pt-3 container">
				{handymen.map((handyman) => (
					<HandymanCard handyman={handyman} />
				))}
			</div>
			<FindAndBookHandyman />

			<Footer />
		</>
	);
};

export default ClientFindHandyman;
