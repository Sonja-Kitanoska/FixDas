import HandymanCard from "../../../../components/HandymanCard/HandymanCard";

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

const SimilarProfiles = () => {
	return (
		<>
			<h2 className="font-size-18 font-weight-700">Similar profiles</h2>
			<p className="font-size-12 font-weight-400">
				Lorem ipsum sit amet lorem ipsum sit..
			</p>
			<div>
				{handymen.map((handyman) => (
					<HandymanCard key={handyman.id} handyman={handyman} />
				))}
			</div>
		</>
	);
};

export default SimilarProfiles;
