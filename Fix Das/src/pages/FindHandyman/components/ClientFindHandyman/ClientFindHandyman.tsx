import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer/Footer";
import HandymanCard from "../../../../components/HandymanCard/HandymanCard";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import FindAndBookHandyman from "../../../LandingPage/components/FindAndBookHandyman/FindAndBookHandyman";
import PostRequest from "../PostRequest/PostRequest";
import { fetchHandymen } from "../../../../api/handymen";
import { Handyman } from "../../../../types/types";
import { useLocation } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";

const ClientFindHandyman = () => {
	const [visibleCount, setVisibleCount] = useState(3);
	const [handymen, setHandymen] = useState<Handyman[]>([]);
	const [isVisible, setIsVisible] = useState(true);

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

	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};

	const filteredHandymen = handymen.filter((handyman) => {
		if (specialtiesFilter.length > 0) {
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
			<div className="container pt-4">
				<div
					onClick={toggleVisibility}
					className="d-flex justify-content-between  py-1 border-bottom font-size-14"
					style={{ color: "#939393", cursor: "pointer" }}
				>
					<p className="mb-0">{filteredHandymen.length} results</p>
					<div className="d-flex align-items-center gap-2">
						<p className="mb-0">View</p>
						<BiSolidDownArrow size={10} />
					</div>
				</div>
			</div>
			{isVisible && (
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
			)}

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
