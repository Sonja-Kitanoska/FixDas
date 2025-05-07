import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { useRef, useState } from "react";
import { User } from "../../../types/types";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../../firebase";
import { deleteUser, signOut } from "firebase/auth";
import { deleteUserData } from "../../../api/users";

const EditProfile = () => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [formData, setFormData] = useState<User | null>(user);
	const [editingField, setEditingField] = useState<string | null>(null);

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
	const enableEditing = (
		e: React.MouseEvent<HTMLButtonElement>,
		fieldName: string,
		inputRef: React.RefObject<HTMLInputElement | null>
	) => {
		e.preventDefault();
		setEditingField(fieldName);
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};
	const handleSave = () => {
		if (formData) {
			setUser(formData);
			navigate("/profile");
		}
	};

	const handleCancel = () => {
		setFormData(user);
		navigate("/profile");
	};

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			console.log("Sign-out successful.");
			setUser(null);
			navigate("/");
		} catch (error) {
			console.error("An error occurred during sign-out:", error);
		}
	};
	const deleteAccount = async () => {
		const firebaseUser = auth.currentUser;
		if (!firebaseUser) return;

		try {
			await deleteUser(firebaseUser);
			await deleteUserData(firebaseUser.uid);
			setUser(null);
			navigate("/");
			console.log("User deleted successfully");
		} catch (error) {
			console.error("Error deleting user from Firebase", error);
		}
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
									name="username"
									id="name"
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									value={formData?.username || ""}
									onChange={handleInputChange}
									disabled={editingField !== "username"}
									ref={nameRef}
									onKeyDown={handleKeyDown}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={(e) => enableEditing(e, "username", nameRef)}
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
									className={`${styles.bgColor} border-0 w-100`}
									style={{ color: "#939393" }}
									value={formData?.email || ""}
									disabled={editingField !== "email"}
									onChange={handleInputChange}
									ref={emailRef}
									onKeyDown={handleKeyDown}
								/>
								<p className="orange font-size-12 mb-0">Verify email address</p>
							</div>
							<div>
								<button
									type="button"
									onClick={(e) => enableEditing(e, "email", emailRef)}
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
									disabled={editingField !== "location"}
									ref={locationRef}
									onKeyDown={handleKeyDown}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={(e) => enableEditing(e, "location", locationRef)}
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
									className={`${styles.bgColor} border-0 w-100`}
									style={{ color: "#939393" }}
									value={formData?.phone || ""}
									placeholder="No phone number entered yet"
									onChange={handleInputChange}
									disabled={editingField !== "phone"}
									ref={phoneRef}
									onKeyDown={handleKeyDown}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={(e) => enableEditing(e, "phone", phoneRef)}
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
									disabled={editingField !== "password"}
									ref={passwordRef}
									onKeyDown={handleKeyDown}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={(e) => enableEditing(e, "password", passwordRef)}
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
						<div className="d-flex flex-column justify-content-center align-items-center gap-2 pt-3 font-size-14">
							<div
								onClick={handleSignOut}
								className="d-flex align-items-center gap-2 justify-content-center"
								style={{ color: "#080808", cursor: "pointer" }}
							>
								<p className="mb-0">Logout</p>
								<FiLogOut />
							</div>
							<p
								onClick={deleteAccount}
								style={{ color: "#939393", cursor: "pointer" }}
								className="mb-0"
							>
								Delete your account
							</p>
						</div>
					</form>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default EditProfile;
