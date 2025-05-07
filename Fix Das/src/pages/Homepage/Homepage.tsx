import { FaRegBookmark, FaRegEdit, FaStar } from "react-icons/fa";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Homepage.module.css";
import { LuMapPin } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import Navbar from "../../components/Navbar/Navbar";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import { Handyman } from "../../types/types";
import { fetchHandymen } from "../../api/handymen";
import { useLocation } from "react-router-dom";

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
								<div
									key={handyman.id}
									className="border-bottom border-top py-4"
								>
									<div className="d-flex justify-content-between mb-4">
										<div className="d-flex gap-1 align-items-center">
											<div style={{ width: "36px", height: "36px" }}>
												<img
													src="/LandingPage/testimonials/client1.svg"
													alt="User image"
													className="w-100 h-100 rounded-circle"
												/>
											</div>

											<div>
												<div className="d-flex gap-2 align-items-center mb-2">
													<p
														className="font-size-14 font-weight-700 mb-0"
														style={{ color: "#080808" }}
													>
														{handyman.name}{" "}
														<span>
															<MdVerified color="#1461F0" />
														</span>
													</p>
												</div>
												<div className="d-flex gap-2 align-items-center">
													<FaStar color="#F5CE47" />
													<p className="font-size-10 font-weight-600 mb-0">4</p>
													<p
														style={{ color: "#939393" }}
														className="font-size-10 font-weight-600 mb-0"
													>
														{handyman.numberReviews} reviews
													</p>
												</div>
											</div>
										</div>

										<div className="d-flex gap-2">
											<div>
												<p
													className="mb-0 font-size-10 font-weight-600 rounded p-1"
													style={{
														color: "#38830A",
														backgroundColor: "#C3E2B0",
													}}
												>
													Now available
												</p>
											</div>
											<div>
												<FaRegBookmark color="#1461F0" />
											</div>
										</div>
									</div>

									<div className="d-flex justify-content-between border-bottom">
										<p className="font-weight-700 font-size-14">
											Plumber available for work
										</p>
										<p style={{ color: "#939393", fontSize: "10px" }}>
											5 days ago
										</p>
									</div>

									<p className="font-size-12 font-weight-400 pt-3">
										{handyman.description}
									</p>

									<div className="d-flex gap-1">
										<LuMapPin color="#5584E5" />
										<p className="font-size-12 fontt-weight-400 mb-0">
											{handyman.location}
										</p>
									</div>

									<div className={styles.scrollContainer}>
										{handyman.workImages.map((image, index) => (
											<img
												key={index}
												src={image}
												alt="Image of the work"
												className={styles.scrollItem}
											/>
										))}
									</div>

									<div className="d-flex justify-content-between font-size-12 font-weight-600 pt-3">
										<a
											className="orange mb-0 text-decoration-none align-self-end"
											style={{ cursor: "pointer" }}
										>
											Show profile
										</a>
										<button className="orange-btn " style={{ width: "110px" }}>
											Contact
										</button>
									</div>
								</div>
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
