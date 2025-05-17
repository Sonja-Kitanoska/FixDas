import HandymanCard from "../../../../components/HandymanCard/HandymanCard";
import { HandymanAd } from "../../../../types/types";

const HandymansPostedAdds = ({
	handymanAdds,
}: {
	handymanAdds: HandymanAd[];
}) => {
	return (
		<div className="pb-3">
			<h3 className="font-size-18 font-weight-700">Listings</h3>
			<p style={{ color: "#727272" }} className="font-size-12">
				Lorem ipsum sit amet
			</p>

			{handymanAdds.length > 0 ? (
				handymanAdds.map((add) => <HandymanCard handyman={add} key={add.id} />)
			) : (
				<div>
					<p className="font-size-14">This handyman hasn’t posted any ads.</p>
				</div>
			)}
		</div>
	);
};

export default HandymansPostedAdds;
