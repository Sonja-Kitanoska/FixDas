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
	const [specialtiesFilter, setSpecialtiesFilter] = useState<string[]>([]);

	useEffect(() => {
		const getHandymen = async () => {
			const data = await fetchHandymen();
			setHandymen(data);
		};
		getHandymen();
	}, []);

	useEffect(() => {
		const specialtiesFromUrl = params.get("specialties") || "";
		setSpecialtiesFilter(
			specialtiesFromUrl
				.split(",")
				.map((s) => s.trim().toLowerCase())
				.filter((s) => s)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	useEffect(() => {
		const queryFromUrl = params.get("query") || "";
		setSearchQuery(queryFromUrl);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSeeMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	const filteredHandymen = handymen.filter((handyman) => {
		if (specialtiesFilter.length > 0) {
			// Only match handymen with at least one of the selected specialties
			return handyman.specialties?.some((spec) =>
				specialtiesFilter.includes(spec.toLowerCase())
			);
		}

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
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					redirectOnEnter={true}
				/>
			</div>
			<div className="py-3 pt-3 container">
				{filteredHandymen.length === 0 ? (
					<div className="text-center">
						<p>No handymen found matching your search criteria.</p>
					</div>
				) : (
					filteredHandymen
						.slice(0, visibleCount)
						.map((handyman) => (
							<HandymanCard key={handyman.id} handyman={handyman} />
						))
				)}
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
