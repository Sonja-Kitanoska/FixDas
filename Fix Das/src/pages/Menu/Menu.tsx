import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
	const navigate = useNavigate();
	return (
		<div className="container py-2 vh-100">
			<div className="d-flex justify-content-between align-items-center">
				<img src="/small-logo.svg" alt="Logo" />
				<IoCloseSharp
					style={{ fontSize: "30px" }}
					onClick={() => navigate("/")}
				/>
			</div>
			<div className="font-size-32 d-flex flex-column align-items-center">
				<NavLink
					to={"/menu"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Suchen</p>
				</NavLink>
				<NavLink
					to={"/ss"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Inserent</p>
				</NavLink>
				<NavLink
					to={"/sign-in"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Anmelden</p>
				</NavLink>
				<NavLink
					to={"/sign-up"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Registrieren</p>
				</NavLink>
			</div>
		</div>
	);
};

export default Menu;
