import { useState } from "react";
import Footer from "../../../../components/Footer/Footer";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import FindAndBookHandyman from "../FindAndBookHandyman/FindAndBookHandyman";
import HeroSection from "../HeroSection/HeroSection";
import HowItWorks from "../HowItWorks/HowItWorks";
import NewlyJoinedHandymen from "../NewlyJoinedHandymen/NewlyJoinedHandymen";
import ServicesHorizontalScroll from "../ServicesHorizontalScroll/ServicesHorizontalScroll";
import Testimonials from "../Testimonials/Testimonials";
import TopHandymen from "../TopHandymen/TopHandymen";

const ClientLandingPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	return (
		<>
			<HeroSection />

			<div className="container pb-3">
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					redirectOnEnter={true}
				/>
			</div>

			<FeaturesSection />

			<ServicesHorizontalScroll />

			<TopHandymen />

			<HowItWorks />

			<NewlyJoinedHandymen />

			<Testimonials />

			<FindAndBookHandyman />

			<Footer />
		</>
	);
};

export default ClientLandingPage;
