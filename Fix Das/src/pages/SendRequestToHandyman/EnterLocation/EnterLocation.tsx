import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EnterLocation.module.css";
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiLocationArrowOutline } from "react-icons/ti";

const EnterLocation = () => {
	const navigate = useNavigate();
	const { handymanId } = useParams();
	return (
		<div>
			<div style={{ minHeight: "100vh" }}>
				<div
					className="container py-3 font-size-14"
					style={{ paddingBottom: "78px" }}
				>
					<div
						className="d-flex gap-2 align-items-center mb-4"
						onClick={() => navigate(`/bookings/booking-details/${handymanId}`)}
					>
						<IoChevronBack style={{ fontSize: "20px", cursor: "pointer" }} />
						<p className="mb-0" style={{ fontSize: "16px" }}>
							Geben Sie Ihren Standort ein
						</p>
					</div>

					<div className={styles.inputWrapper}>
						{<IoSearch className={styles.icon} />}
						<input
							id="search"
							name="search"
							placeholder="Search"
							className={`form-control input-field ${styles.inputField}`}
						/>
						<span
							className={styles.closeIcon}
							role="button"
							// onClick={handleGetCurrentLocation}
							onClick={() => {
								navigate(`/bookings/enter-location/${handymanId}`);
							}}
						>
							<IoIosCloseCircleOutline color="red" />
						</span>
					</div>
					<div className="d-flex align-items-center gap-2 py-2 pt-4 border-bottom">
						<TiLocationArrowOutline size={25} color="#FA6100" />
						<p className="mb-0">Verwenden Sie Ihren aktuellen Standort</p>
					</div>

					<div className="py-4">
						<p style={{ color: "#939393" }}>Suchergebnis</p>
						<div className="d-flex align-items-center gap-2">
							<TiLocationArrowOutline size={25} color="#FA6100" />
							<p className="mb-0">result</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EnterLocation;
