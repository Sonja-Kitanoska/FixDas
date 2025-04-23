import { useState } from "react";
import styles from "./ToggleRole.module.css";

const RoleToggle = () => {
	const [selectedRole, setSelectedRole] = useState("client");

	const handleToggle = () => {
		setSelectedRole((prev) => (prev === "client" ? "handyman" : "client"));
	};

	return (
		<div>
			<div className="d-flex align-items-center justify-content-center gap-2 py-2">
				<span className={selectedRole === "handyman" ? styles.activeLabel : ""}>
					Für Handwerker
				</span>
				<div className="form-check form-switch m-0 d-flex justify-content-center">
					<input
						className={`form-check-input ${styles.orangeSwitch}`}
						type="checkbox"
						id="roleSwitch"
						checked={selectedRole === "client"}
						onChange={handleToggle}
					/>
				</div>
				<span className={selectedRole === "client" ? styles.activeLabel : ""}>
					Für Kunden
				</span>
			</div>

			<div className="mt-3">{selectedRole}</div>
		</div>
	);
};

export default RoleToggle;
