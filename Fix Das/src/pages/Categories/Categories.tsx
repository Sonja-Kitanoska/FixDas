import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import useCategories from "../../hooks/useCategories";

const Categories = () => {
	const categories = useCategories();
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
							<SearchBar />
						</div>
					</div>

					{/* WHEN WE SEARCH IN THE SEARCH BAR HANDYMANCARDS SHOULD BE RENDERED */}

					<div className="row g-2 py-3">
						{categories.map((category) => (
							<div key={category.id} className="col-4">
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
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default Categories;
