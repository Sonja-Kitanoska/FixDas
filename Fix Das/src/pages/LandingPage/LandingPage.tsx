import styles from "./LandingPage.module.css";
import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import ToggleRole from "./components/ToggleRole/ToggleRole";

const LandingPage = () => {
	return (
		<div className={styles.darkWhiteBg}>
			<LandingPageNavbar />
			<ToggleRole />
		</div>
	);
};

export default LandingPage;
