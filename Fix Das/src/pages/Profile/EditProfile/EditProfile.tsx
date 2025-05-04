import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { useState } from "react";
import { User } from "../../../types/types";

const EditProfile = () => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);

	const [formData, setFormData] = useState<User | null>(user);
	const [isEditing, setIsEditing] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => {
			if (!prevData) return prevData;
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	const enableEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsEditing(true);
	};

	const handleSave = () => {
		if (formData) {
			setUser(formData);
			setIsEditing(false);
			navigate("/profile");
		}
	};

	const handleCancel = () => {
		setFormData(user);
		setIsEditing(false);
	};
	return (
		<>
			<div style={{ paddingBottom: "78px" }}>
				<div className="container py-3">
					<div className="d-flex justify-content-between align-items-center">
						<IoChevronBack
							style={{ fontSize: "20px" }}
							onClick={() => navigate("/profile")}
						/>
						<p className="orange mb-0 font-weight-700">Konto bearbeiten</p>
						<img
							src="/notification-icon.svg"
							alt="Notifications icon"
							onClick={() => navigate("/profile/notifications")}
						/>
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

					<form onSubmit={handleSave} className="border-top">
						{/* Name */}
						<div className="d-flex justify-content-between align-items-center font-size-14 border-bottom py-2">
							<div>
								<label htmlFor="name" className="w-100">
									Full Name <span className="orange">*</span>
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									value={formData?.username || ""}
									onChange={handleInputChange}
									disabled={!isEditing}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={enableEditing}
									className="orange-border-btn"
									style={{ padding: "6px 14px", borderRadius: "8px" }}
								>
									{user?.phone ? "Edit" : "Add"}
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
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									value={formData?.email || ""}
									disabled={!isEditing}
									onChange={handleInputChange}
								/>
								<p className="orange font-size-12 mb-0">Verify email address</p>
							</div>
							<div>
								<button
									type="button"
									onClick={enableEditing}
									className="orange-border-btn"
									style={{ padding: "6px 14px", borderRadius: "8px" }}
								>
									{user?.email ? "Edit" : "Add"}
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
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									value={formData?.location || ""}
									placeholder="No location entered yet"
									onChange={handleInputChange}
									disabled={!isEditing}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={enableEditing}
									className="orange-border-btn"
									style={{ padding: "6px 14px", borderRadius: "8px" }}
								>
									{user?.location ? "Edit" : "Add"}
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
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									value={formData?.phone || ""}
									placeholder="No phone number entered yet"
									onChange={handleInputChange}
									disabled={!isEditing}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={enableEditing}
									className="orange-border-btn"
									style={{ padding: "6px 14px", borderRadius: "8px" }}
								>
									{user?.phone ? "Edit" : "Add"}
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
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									value={formData?.password}
									onChange={handleInputChange}
									disabled={!isEditing}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={enableEditing}
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
						<div className="d-flex gap-2">
							<button
								type="button"
								onClick={handleCancel}
								className="orange-border-btn"
							>
								Cancel
							</button>
							<button type="submit" className="orange-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default EditProfile;
