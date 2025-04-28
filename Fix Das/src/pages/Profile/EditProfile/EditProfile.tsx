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

			<div className="py-4 d-flex justify-content-center">
				<div className={styles.profileImageWrapper}>
					<img
						src="/Profile/ProfilePicture.svg"
						alt="Profile Image"
						className={styles.profileImage}
					/>
					<div className={styles.blurOverlay}>Edit</div>
				</div>
			</div>

			<div className="border-top">
				{/* Name */}
				<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
					<div>
						<label htmlFor="name" className="w-100">
							Full Name <span className="orange">*</span>
						</label>
						<input
							type="text"
							name="name"
							id="name"
							className="border-0"
							style={{ color: "#939393" }}
							value={"Anna Muller"}
						/>
					</div>
					<div>
						<button
							className="orange-border-btn"
							style={{ padding: "6px 14px", borderRadius: "8px" }}
						>
							Edit
						</button>
					</div>
				</div>
				{/* Email */}
				<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
					<div>
						<label htmlFor="email" className="w-100">
							Email Address <span className="orange">*</span>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="border-0"
							style={{ color: "#939393" }}
							value={"annamuller@yahoo.com"}
						/>
						<p className="orange font-size-12 mb-0">Verify email address</p>
					</div>
					<div>
						<button
							className="orange-border-btn"
							style={{ padding: "6px 14px", borderRadius: "8px" }}
						>
							Edit
						</button>
					</div>
				</div>
				{/* Location */}
				<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
					<div>
						<label htmlFor="location" className="w-100">
							Location
						</label>
						<input
							type="text"
							name="location"
							id="location"
							className="border-0"
							style={{ color: "#939393" }}
							value={"No location entered yet"}
						/>
					</div>
					<div>
						<button
							className="orange-border-btn"
							style={{ padding: "6px 14px", borderRadius: "8px" }}
						>
							Edit
						</button>
					</div>
				</div>
				{/* Phone number */}
				<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
					<div>
						<label htmlFor="phone" className="w-100">
							Phone Number
						</label>
						<input
							type="tel"
							name="phone"
							id="phone"
							className="border-0"
							style={{ color: "#939393" }}
							value={"No phone number entered yet"}
						/>
					</div>
					<div>
						<button
							className="orange-border-btn"
							style={{ padding: "6px 14px", borderRadius: "8px" }}
						>
							Edit
						</button>
					</div>
				</div>
				{/* Password */}
				<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
					<div>
						<label htmlFor="phone" className="w-100">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="border-0"
							style={{ color: "#939393" }}
							value={"casdfölmsdfllsmmfelö"}
						/>
					</div>
					<div>
						<button
							className="orange-border-btn"
							style={{ padding: "6px 14px", borderRadius: "8px" }}
						>
							Change
						</button>
					</div>
				</div>

				{/* Notify */}
				<div className="py-3">
					<div className="font-size-14">
						<div className="d-flex gap-2 align-items-center">
							<input type="checkbox" id="notifyEmail" />
							<label htmlFor="notifyEmail">Notify via email</label>
						</div>
						<p className="font-size-12" style={{ color: "#474747" }}>
							Get notified via email when something happens
						</p>
					</div>
					<div className="font-size-14">
						<div className="d-flex gap-2 align-items-center">
							<input type="checkbox" id="notifySMS" className="" />
							<label htmlFor="notifySMS">Notify via SMS</label>
						</div>
						<p className="font-size-12" style={{ color: "#474747" }}>
							Get notified via SMS when something happens
						</p>
					</div>
				</div>
			</div>
			<Navbar />
		</div>
	);
};

export default EditProfile;
