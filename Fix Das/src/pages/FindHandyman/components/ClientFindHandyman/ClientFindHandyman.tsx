import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer/Footer";
import HandymanCard from "../../../../components/HandymanCard/HandymanCard";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import FindAndBookHandyman from "../../../LandingPage/components/FindAndBookHandyman/FindAndBookHandyman";
import PostRequest from "../PostRequest/PostRequest";
import { fetchHandymen } from "../../../../api/handymen";
import { Handyman } from "../../../../types/types";

const ClientFindHandyman = () => {
	const [visibleCount, setVisibleCount] = useState(3);
	const [handymen, setHandymen] = useState<Handyman[]>([]);

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
	return (
		<>
			<div className="container">
				<SearchBar />
			</div>
			<div className="py-3 pt-3 container">
				{handymen.slice(0, visibleCount).map((handyman) => (
					<HandymanCard key={handyman.id} handyman={handyman} />
				))}
			</div>

			{visibleCount < handymen.length && (
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
