import Footer from "../../components/Footer/Footer";
import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FindAndBookHandyman from "../LandingPage/components/FindAndBookHandyman/FindAndBookHandyman";

const FindHandyman = () => {
	return (
		<div>
			<LandingPageNavbar />

			<h2 className="font-size-32 font-weight-500 container">
				Find a craftsman
			</h2>

			<SearchBar />

			<FindAndBookHandyman />

			<Footer />
		</div>
	);
};

export default FindHandyman;
