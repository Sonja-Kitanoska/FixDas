import { FaRegEdit } from "react-icons/fa";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Homepage.module.css";

import Navbar from "../../components/Navbar/Navbar";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import { Handyman } from "../../types/types";
import { fetchHandymen } from "../../api/handymen";
import { useLocation } from "react-router-dom";
import HomepageHandymanCard from "./components/HomepageHandymanCard/HomepageHandymanCard";

const Homepage = () => {
	const user = useUserStore((state) => state.user);
	const [searchQuery, setSearchQuery] = useState("");
	const [handymen, setHandymen] = useState<Handyman[]>([]);
	const [specialtiesFilter, setSpecialtiesFilter] = useState<string[]>([]);
	const location = useLocation();
	const params = new URLSearchParams(location.search);

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
			<div style={{ minHeight: "100vh" }}>
				<div className="container" style={{ paddingBottom: "76px" }}>
					<div className="d-flex justify-content-between py-5">
						<h2 className="orange font-size-24 font-weight-700 mb-0">
							Hello {user!.username},
						</h2>
						<img src="/notification-icon.svg" alt="Notification icon" />
					</div>
					<p>
						Are you looking for help? . Find suitable craftsmen for your needs.
						Below are the latest displays of craftsmen near you .
					</p>
					<div className="d-flex justify-content-between align-items-center m-0 gap-2">
						<div className="flex-grow-1">
							<SearchBar
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								redirectOnEnter={true}
							/>
						</div>
						<div>
							<div className={styles.editIconContainer}>
								<FaRegEdit size={20} color="#939393" />
							</div>
						</div>
					</div>

					<h6 className="font-size-14 font-weight-700 pt-3">
						Recommended listings
					</h6>

					<div className="py-3">
						{filteredHandymen.length === 0 ? (
							<div className="text-center">
								<p>No handymen found matching your search criteria.</p>
							</div>
						) : (
							filteredHandymen.map((handyman) => (
								<HomepageHandymanCard key={handyman.id} handyman={handyman} />
							))
						)}
					</div>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default Homepage;
