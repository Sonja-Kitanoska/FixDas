import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";

const services = [
	{ name: "Home Repair", image: "/LandingPage/services/Group-1.svg" },
	{ name: "Windows", image: "/LandingPage/services/Group-2.svg" },
	{ name: "Painter", image: "/LandingPage/services/Group-3.svg" },
	{ name: "Electrician", image: "/LandingPage/services/Group-4.svg" },
	{ name: "A / C", image: "LandingPage/services/Group-5.svg" },
	{ name: "Cleaning", image: "LandingPage/services/Group-6.svg" },
	{ name: "Assembly", image: "LandingPage/services/Group-7.svg" },
	{ name: "Carpenter", image: "LandingPage/services/Group-8.svg" },
	{ name: "Construction", image: "LandingPage/services/Group-9.svg" },
	{ name: "A / C", image: "LandingPage/services/Group-5.svg" },
	{ name: "Cleaning", image: "LandingPage/services/Group-6.svg" },
	{ name: "Assembly", image: "LandingPage/services/Group-7.svg" },
];

const Categories = () => {
	return (
		<>
			<div className="container" style={{ paddingBottom: "76px" }}>
				<div className="d-flex justify-content-between py-5">
					<h2 className="orange font-size-24 font-weight-700 mb-0">
						Search Category
					</h2>
					<img src="/notification-icon.svg" alt="Notification icon" />
				</div>
				<p>
					Use the search bar to refine your search, or select a category from
					below
				</p>
				<div className="d-flex justify-content-between align-items-center m-0 gap-2">
					<div className="flex-grow-1">
						<SearchBar />
					</div>
				</div>

				{/* WHEN WE SEARCH IN THE SEARCH BAR HANDYMANCARDS SHOULD BE RENDERED */}

				<div className="row g-2 py-3">
					{services.map((service) => (
						<div key={crypto.randomUUID()} className="col-4">
							<div className="bg-white d-flex flex-column align-items-center">
								<div style={{ width: "50px", height: "50px" }}>
									<img
										src={service.image}
										alt="Service"
										className="w-100 h-100 object-fit-contain"
									/>
								</div>
								<p>{service.name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default Categories;
