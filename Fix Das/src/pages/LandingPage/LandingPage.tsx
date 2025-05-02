import styles from "./LandingPage.module.css";
import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import ToggleRole from "./components/ToggleRole/ToggleRole";
import ClientLandingPage from "./components/ClientLandingPage/ClientLandingPage";
import { useUserStore } from "../../store/userStore";

const LandingPage = () => {
	const { selectedRole, setSelectedRole } = useUserStore();
	return (
		<div className={styles.darkWhiteBg}>
			<LandingPageNavbar />
			<ToggleRole
				selectedRole={selectedRole}
				setSelectedRole={setSelectedRole}
				ClientComponent={<ClientLandingPage />}
				HandymanComponent={
					<p className="text-center">This is Handyman landing page</p>
				}
			/>
		</div>
	);
};

export default LandingPage;
