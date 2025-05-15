import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import { useUserStore } from "../../store/userStore";
import RoleToggle from "../LandingPage/components/ToggleRole/ToggleRole";
import ClientFindHandyman from "./components/ClientFindHandyman/ClientFindHandyman";

const FindHandyman = () => {
	const { selectedRole, setSelectedRole } = useUserStore();
	return (
		<div>
			<LandingPageNavbar />

			<h2 className="font-size-32 font-weight-500 container py-3">
				Find a craftsman
			</h2>

			<RoleToggle
				selectedRole={selectedRole}
				setSelectedRole={setSelectedRole}
				ClientComponent={<ClientFindHandyman />}
				HandymanComponent={
					<p
						className="text-center mb-0 container"
						style={{ height: "calc(100vh - 194px)" }}
					>
						This is Find-handyman page for handymen.
					</p>
				}
			/>
		</div>
	);
};

export default FindHandyman;
