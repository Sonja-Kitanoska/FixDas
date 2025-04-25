import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
	return (
		<div className="container py-3">
			<div className="d-flex justify-content-between align-items-center">
				<IoChevronBack style={{ fontSize: "20px" }} />
				<p className="orange mb-0">Konto bearbeiten</p>
				<img src="/notification-icon.svg" alt="Notifications icon" />
			</div>

			<div className="py-5 d-flex justify-content-center">
				<div className={styles.profileImageWrapper}>
					<img
						src="/Profile/ProfilePicture.svg"
						alt="Profile Image"
						className={styles.profileImage}
					/>
					<div className={styles.blurOverlay}>Edit</div>
				</div>
			</div>
			<Navbar />
		</div>
	);
};

export default EditProfile;
