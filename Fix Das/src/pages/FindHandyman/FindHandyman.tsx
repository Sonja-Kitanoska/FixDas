import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import RoleToggle from "../LandingPage/components/ToggleRole/ToggleRole";
import ClientFindHandyman from "./components/ClientFindHandyman/ClientFindHandyman";

const FindHandyman = () => {
	return (
		<div>
			<LandingPageNavbar />

			<h2 className="font-size-32 font-weight-500 container pt-3">
				Find a craftsman
			</h2>

			<RoleToggle
				ClientComponent={<ClientFindHandyman />}
				HandymanComponent={
					<p className="text-center">
						This is Find-handyman page for handymen.
					</p>
				}
			/>
		</div>
	);
};

export default FindHandyman;
