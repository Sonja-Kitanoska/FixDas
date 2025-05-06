import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer/Footer";
import HandymanCard from "../../../../components/HandymanCard/HandymanCard";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import FindAndBookHandyman from "../../../LandingPage/components/FindAndBookHandyman/FindAndBookHandyman";
import PostRequest from "../PostRequest/PostRequest";
import { fetchHandymen } from "../../../../api/handymen";
import { Handyman } from "../../../../types/types";
import { useLocation } from "react-router-dom";

const ClientFindHandyman = () => {
	const [visibleCount, setVisibleCount] = useState(3);
	const [handymen, setHandymen] = useState<Handyman[]>([]);
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const initialQuery = params.get("query") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	useEffect(() => {
		const getHandymen = async () => {
			const data = await fetchHandymen();
			setHandymen(data);
		};
		getHandymen();
	}, []);

	const handleSeeMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	const filteredHandymen = handymen.filter((handyman) => {
		const query = searchQuery.toLowerCase();
		return (
			handyman.name.toLowerCase().includes(query) ||
			handyman.description.toLowerCase().includes(query) ||
			handyman.location.toLowerCase().includes(query) ||
			handyman.categories.some((cat) => cat.toLowerCase().includes(query))
		);
	});

	return (
		<>
			<div className="container">
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>
			<div className="py-3 pt-3 container">
				{filteredHandymen.slice(0, visibleCount).map((handyman) => (
					<HandymanCard key={handyman.id} handyman={handyman} />
				))}
			</div>

			{visibleCount < filteredHandymen.length && (
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

			<PostRequest />
			<FindAndBookHandyman />

			<Footer />
		</>
	);
};

export default ClientFindHandyman;
