import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";

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
			</div>
			<Navbar />
		</>
	);
};

export default Categories;
