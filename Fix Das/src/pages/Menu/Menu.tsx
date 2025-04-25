import { IoCloseSharp } from "react-icons/io5";

const Menu = () => {
	return (
		<div className="container py-2">
			<div className="d-flex justify-content-between align-items-center">
				<img src="/small-logo.svg" alt="Logo" />
				<IoCloseSharp style={{ fontSize: "30px" }} />
			</div>
			<div>
				<p>Suchen</p>
				<p>Inserent</p>
				<p>Anmelden</p>
				<p>Registrieren</p>
			</div>
		</div>
	);
};

export default Menu;
