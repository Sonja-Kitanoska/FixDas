import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import useCategories from "../../hooks/useCategories";
import { Handyman } from "../../types/types";
import { fetchHandymen } from "../../api/handymen";
import HandymanCard from "../../components/HandymanCard/HandymanCard";
import { useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
	const categories = useCategories();
	const [searchQuery, setSearchQuery] = useState("");
	const [handymen, setHandymen] = useState<Handyman[]>([]);

	const navigate = useNavigate();
	const location = useLocation();
	const isSearchNotActive = searchQuery.trim() === "";

	// useEffect(() => {
	// 	if (searchQuery.trim() === "") {
	// 		setIsSearchNotActive(true);
	// 	} else {
	// 		setIsSearchNotActive(false);
	// 	}
	// }, [searchQuery]);

	useEffect(() => {
		const getHandymen = async () => {
			const data = await fetchHandymen();
			setHandymen(data);
		};
		getHandymen();
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const queryFromUrl = params.get("query") || "";
		setSearchQuery(queryFromUrl);
	}, [location.search]);

	const handleCategoryClick = (categoryName: string) => {
		setSearchQuery(categoryName);
	};

	const filteredHandymen = handymen.filter((handyman) => {
		const query = searchQuery.toLowerCase().trim();
		// If searchQuery is empty, show all handymen
		if (searchQuery.trim() === "") {
			return true;
		}

		// Filter by category if searchQuery is a category name
		const isCategoryFilter = handyman.categories.some((cat) =>
			cat.toLowerCase().trim().includes(query)
		);

		// If category filter is active (searchQuery is a category)
		if (isCategoryFilter) {
			// If it's a category filter, only filter by categories
			return handyman.categories.some((cat) =>
				cat.toLowerCase().trim().includes(query)
			);
		}

		// If no category filter is active, filter by name, description, location, and categories
		return (
			handyman.name.toLowerCase().includes(query) ||
			handyman.description.toLowerCase().includes(query) ||
			handyman.location.toLowerCase().includes(query) ||
			handyman.categories.some((cat) =>
				cat.toLowerCase().trim().includes(query.trim())
			)
		);
	});

	return (
		<>
			<div style={{ paddingBottom: "76px", minHeight: "100vh" }}>
				<div className="container pt-3" style={{}}>
					<div className="d-flex justify-content-between mb-3">
						<h2 className="orange font-size-24 font-weight-700 mb-0">
							Search Category
						</h2>
						<img src="/notification-icon.svg" alt="Notification icon" />
					</div>
					<p className="mb-4">
						Use the search bar to refine your search, or select a category from
						below
					</p>
					<div className="d-flex justify-content-between align-items-center m-0 gap-2">
						<div className="flex-grow-1">
							<SearchBar
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								redirectOnEnter={true}
							/>
						</div>
					</div>

					{/* WHEN WE SEARCH IN THE SEARCH BAR HANDYMANCARDS SHOULD BE RENDERED */}
					{!isSearchNotActive && (
						<div className="py-3 pt-3 container">
							{filteredHandymen.length === 0 ? (
								<div className="text-center">
									<p>No handymen found matching your search criteria.</p>
								</div>
							) : (
								filteredHandymen.map((handyman) => (
									<HandymanCard key={handyman.id} handyman={handyman} />
								))
							)}
						</div>
					)}
					{isSearchNotActive && (
						<div className="row g-2 py-3">
							{categories.map((category) => (
								<div
									key={category.id}
									className="col-4"
									onClick={() => handleCategoryClick(category.name)}
								>
									<div className="bg-white h-100 p-2 d-flex flex-column align-items-center justify-content-center">
										<div style={{ width: "50px", height: "50px" }}>
											<img
												src={category.image}
												alt="Service"
												className="w-100 h-100 object-fit-contain"
											/>
										</div>
										<p className="text-center mb-0">{category.name}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default Categories;
