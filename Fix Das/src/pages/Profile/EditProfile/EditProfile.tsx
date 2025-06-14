import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { useEffect, useRef, useState } from "react";
import { User } from "../../../types/types";
import { FiLogOut } from "react-icons/fi";
import { auth, db } from "../../../firebase";
import {
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	signOut,
	updatePassword,
	verifyBeforeUpdateEmail,
} from "firebase/auth";
import { deleteUserData, updateUser } from "../../../api/users";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const resizeAndConvertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const img = new Image();
			img.src = reader.result as string;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const MAX_WIDTH = 200;
				const scaleSize = MAX_WIDTH / img.width;

				canvas.width = MAX_WIDTH;
				canvas.height = img.height * scaleSize;

				const ctx = canvas.getContext("2d");
				if (!ctx) return reject("Canvas context not available");

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				// Quality from 0.0 to 1.0
				const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);
				resolve(compressedBase64);
			};

			img.onerror = (error) => reject(error);
		};

		reader.onerror = (error) => reject(error);
	});
};

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
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (!user?.id) return;
			try {
				const userRef = doc(db, "users", user.id);
				const userSnap = await getDoc(userRef);

				if (userSnap.exists()) {
					const userData = userSnap.data() as User;
					setFormData(userData); // include the image from Firebase
				}
			} catch (err) {
				console.error("Failed to fetch user data:", err);
			}
		};

		fetchUserData();
	}, [user?.id]);

	async function reauthenticate(password: string) {
		if (!auth.currentUser || !auth.currentUser.email)
			throw new Error("No user");
		const credential = EmailAuthProvider.credential(
			auth.currentUser.email,
			password
		);
		return reauthenticateWithCredential(auth.currentUser, credential);
	}

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			try {
				const base64Image = await resizeAndConvertToBase64(file);
				setFormData((prev) => (prev ? { ...prev, image: base64Image } : prev));
			} catch (error) {
				console.error("Error resizing image:", error);
			}
		}
	};

	async function updateUserProfile(userId: string, updatedUser: User) {
		try {
			const userRef = doc(db, "users", userId);
			await updateDoc(userRef, updatedUser);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	}

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
	const handleSave = async () => {
		setError("");
		setSuccess("");
		if (formData) {
			const firebaseUser = auth.currentUser;

			if (firebaseUser) {
				if (formData.email && formData.email !== firebaseUser.email) {
					try {
						if (!formData.password) {
							setError("Password is required to reauthenticate.");
							return;
						}
						await reauthenticate(formData.password);
						await verifyBeforeUpdateEmail(firebaseUser, formData.email);
						setSuccess(
							"A verification email was sent to your new address. Please check your inbox to confirm the change and the click on the Save button again."
						);
						return;
					} catch (error: unknown) {
						console.error("Error updating email:", error);
						if (
							typeof error === "object" &&
							error !== null &&
							"code" in error &&
							(error as { code?: string }).code === "auth/requires-recent-login"
						) {
							setError("Please sign in again to change your email.");
							navigate("/sign-in");
						} else if (
							typeof error === "object" &&
							error !== null &&
							"code" in error &&
							(error as { code?: string }).code === "auth/operation-not-allowed"
						) {
							setError(
								"Email change requires verification. A verification email has been sent."
							);
						} else if (
							typeof error === "object" &&
							error !== null &&
							"message" in error
						) {
							setError(
								(error as { message?: string }).message ||
									"An unknown error occurred."
							);
						} else {
							setError("An unknown error occurred.");
						}

						if (
							typeof error === "object" &&
							error !== null &&
							"code" in error &&
							(error as { code?: string }).code === "auth/requires-recent-login"
						) {
							setError("Please sign in again to change your email.");
							navigate("/sign-in");
							return;
						}
					}
				}

				if (formData.password && formData.password.length >= 6) {
					try {
						await updatePassword(firebaseUser, formData.password);
					} catch (error: unknown) {
						console.error("Error updating password:", error);
						// Handle re-authentication required
						if (
							typeof error === "object" &&
							error !== null &&
							"code" in error &&
							(error as { code?: string }).code === "auth/requires-recent-login"
						) {
							setError(
								"For security reasons, please sign in again to change your password."
							);

							navigate("/sign-in");
						}
					}
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...userDataWithoutPassword } = formData;

			setUser(userDataWithoutPassword);
			await updateUser(formData.id, userDataWithoutPassword);
			await updateUserProfile(formData.id, userDataWithoutPassword);

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

					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSave();
						}}
					>
						<div className="py-4 d-flex justify-content-center">
							<div
								className={styles.profileImageWrapper}
								onClick={handleImageClick}
							>
								<img
									src={formData?.image ?? "/avatar.jpg"}
									alt="Profile Image"
									className={styles.profileImage}
								/>
								<div className={styles.blurOverlay}>Edit</div>
							</div>
							{/* Hidden file input */}
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleImageChange}
							/>
						</div>
						{/* Name */}
						<div className="d-flex justify-content-between align-items-center font-size-14 border-bottom py-2 border-top">
							<div className="w-100">
								<label htmlFor="name" className="w-100">
									Full Name <span className="orange">*</span>
								</label>
								<input
									type="text"
									name="username"
									id="username"
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
									{formData?.phone ? "Edit" : "Add"}
								</button>
							</div>
						</div>
						{/* Email */}
						<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
							<div className="w-100">
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
									{formData?.email ? "Edit" : "Add"}
								</button>
							</div>
						</div>
						{/* Location */}
						<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
							<div className="w-100">
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
									{formData?.location ? "Edit" : "Add"}
								</button>
							</div>
						</div>
						{/* Phone number */}
						<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
							<div className="w-100">
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
									{formData?.phone ? "Edit" : "Add"}
								</button>
							</div>
						</div>
						{/* Password */}
						<div className="d-flex justify-content-between align-items-center font-size-14  border-bottom py-2">
							<div className="w-100">
								<label htmlFor="phone" className="w-100">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									className={`${styles.bgColor} border-0`}
									style={{ color: "#939393" }}
									placeholder="***********"
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

						{error && <p className="text-danger font-size-14">{error}</p>}
						{success && <p className="text-success font-size-14">{success}</p>}

						{/* Notify */}
						<div className="py-3">
							<div className="font-size-14">
								<div className="d-flex gap-2 align-items-center">
									<input
										type="checkbox"
										id="notifyEmail"
										className={`${styles.checkboxInput} form-check-input`}
									/>
									<label htmlFor="notifyEmail">Notify via email</label>
								</div>
								<p className="font-size-12" style={{ color: "#474747" }}>
									Get notified via email when something happens
								</p>
							</div>
							<div className="font-size-14">
								<div className="d-flex gap-2 align-items-center">
									<input
										type="checkbox"
										id="notifySMS"
										className={`${styles.checkboxInput} form-check-input`}
									/>
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
