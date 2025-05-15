import HandymanCard from "../../../../components/HandymanCard/HandymanCard";
import { Handyman } from "../../../../types/types";

const SimilarProfiles = ({
	similarHandymen,
}: {
	similarHandymen: Handyman[];
}) => {
	return (
		<>
			<h2 className="font-size-18 font-weight-700">Similar profiles</h2>
			<p className="font-size-12 font-weight-400">
				Lorem ipsum sit amet lorem ipsum sit..
			</p>
			<div>
				{similarHandymen.map((handyman) => (
					<HandymanCard key={handyman.id} handyman={handyman} />
				))}
			</div>
		</>
	);
};

export default SimilarProfiles;
