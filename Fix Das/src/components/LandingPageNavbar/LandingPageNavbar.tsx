import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const LandingPageNavbar = () => {
	const navigate = useNavigate();
	return (
		<div className="d-flex justify-content-between container-fluid align-items-center py-2">
			<img src="/small-logo.svg" alt="Logo" />
			<GiHamburgerMenu
				style={{ fontSize: "30px" }}
				onClick={() => navigate("/menu")}
			/>
		</div>
	);
};

export default LandingPageNavbar;
