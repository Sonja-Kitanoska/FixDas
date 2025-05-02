import { FaRegBookmark, FaRegEdit, FaStar } from "react-icons/fa";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Homepage.module.css";
import { LuMapPin } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import Navbar from "../../components/Navbar/Navbar";
import { useUserStore } from "../../store/userStore";

const handymen = [
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client1.svg",
		name: "Klaus Schneider",
		location: "Berlin, Germany",
		stars: 5,
		numberReviews: 38,
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

const Homepage = () => {
	const user = useUserStore((state) => state.user);

	return (
		<>
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
						<SearchBar />
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
					{handymen.map((handyman) => (
						<div key={handyman.id} className="border-bottom border-top py-4">
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
											style={{ color: "#38830A", backgroundColor: "#C3E2B0" }}
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
								<p style={{ color: "#939393", fontSize: "10px" }}>5 days ago</p>
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
					))}
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default Homepage;
