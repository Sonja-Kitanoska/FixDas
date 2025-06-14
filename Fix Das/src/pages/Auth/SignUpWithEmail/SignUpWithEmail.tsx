import styles from "./SignUpWithEmail.module.css";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useUserStore } from "../../../store/userStore";
import { FirebaseError } from "firebase/app";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { createUser } from "../../../api/users";
import { User } from "../../../types/types";

const SignUpWithEmail = () => {
	const navigate = useNavigate();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});
	const [validationErrors, setValidationErrors] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});
	const { setUser, loading } = useUserStore();
	const selectedRole = useUserStore((state) => state.selectedRole);
	const [error, setError] = useState("");

	const getFirebaseErrorMessage = (code: string): string => {
		switch (code) {
			case "auth/email-already-in-use":
				return "This email is already in use. Try logging in or using a different email.";
			case "auth/invalid-email":
				return "Invalid email format.";
			case "auth/weak-password":
				return "Password is too weak. Try a stronger one.";
			default:
				return "Failed to sign up. Please try again.";
		}
	};

	const validateForm = () => {
		const errors = {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
		};

		if (!formData.name.trim()) {
			errors.name = "Name is required.";
		}

		if (!formData.email) {
			errors.email = "Email is required.";
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			errors.email = "Invalid email format.";
		}

		if (!formData.password) {
			errors.password = "Password is required.";
		} else if (formData.password.length < 6) {
			errors.password = "Password must be at least 6 characters.";
		}

		if (!formData.confirmPassword) {
			errors.confirmPassword = "Please confirm your password.";
		} else if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match.";
		}

		if (!formData.phone.trim()) {
			errors.phone = "Phone number is required.";
		} else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
			errors.phone = "Invalid phone number.";
		}

		setValidationErrors(errors);

		return Object.values(errors).every((msg) => msg === "");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		setValidationErrors((prevErrors) => ({
			...prevErrors,
			[name]: "",
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}
		setError("");

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				formData.email,
				formData.password
			);
			const result = userCredential.user;

			const newUser: User = {
				id: result.uid,
				username: formData.name,
				phone: formData.phone,
				email: formData.email,
				role: selectedRole,
				createdAt: new Date().toISOString(),
			};

			await setDoc(doc(db, "users", result.uid), newUser);

			setUser(newUser);
			createUser(newUser);

			navigate("/homepage");
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error instanceof FirebaseError) {
					setError(getFirebaseErrorMessage(error.code));
				} else {
					setError("An unexpected error occurred. Please try again.");
				}
			}
		}
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const toggleConfirmPasswordVisibility = () => {
		setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
	};
	return (
		<div className="container-fluid">
			{loading && <LoadingSpinner />}
			<div className="text-center p-3">
				<img src="./logo.svg" alt="Logo" />
			</div>
			<div className={`${styles.divider} d-flex justify-content-evenly mb-4`}>
				<p className="font-size-12 font-weight-600 orange">
					Register as customers
				</p>
				<p className="font-size-12 font-weight-600">Register as craftsmen</p>
			</div>
			<form onSubmit={handleSubmit} noValidate>
				{/* Name */}
				<div className={styles.inputWrapper}>
					<FaRegUser className={styles.icon} />
					<input
						type="text"
						placeholder="Name"
						name="name"
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.name}
					/>
				</div>
				{validationErrors.name && (
					<p className="text-danger font-size-12">{validationErrors.name}</p>
				)}

				{/* Email */}
				<div className={styles.inputWrapper}>
					<MdOutlineEmail className={styles.icon} />
					<input
						type="email"
						name="email"
						placeholder="Email"
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.email}
					/>
				</div>
				{validationErrors.email && (
					<p className="text-danger font-size-12">{validationErrors.email}</p>
				)}

				{/* Password */}
				<div className={styles.inputWrapper}>
					{<TbLockPassword className={styles.icon} />}
					<input
						type={isPasswordVisible ? "text" : "password"}
						name="password"
						placeholder="Password"
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.password}
					/>
					<span
						className={styles.eyeIcon}
						onClick={togglePasswordVisibility}
						role="button"
					>
						{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
					</span>
				</div>
				{validationErrors.password && (
					<p className="text-danger font-size-12">
						{validationErrors.password}
					</p>
				)}
				{/* Confirm Password */}
				<div className={styles.inputWrapper}>
					{<TbLockPassword className={styles.icon} />}
					<input
						type={isConfirmPasswordVisible ? "text" : "password"}
						name="confirmPassword"
						placeholder="Confirm password"
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.confirmPassword}
					/>

					<span
						className={styles.eyeIcon}
						onClick={toggleConfirmPasswordVisibility}
						role="button"
					>
						{isConfirmPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
					</span>
				</div>
				{validationErrors.confirmPassword && (
					<p className="text-danger font-size-12">
						{validationErrors.confirmPassword}
					</p>
				)}
				{/* Phone */}
				<div className={styles.inputWrapper}>
					{<MdOutlineLocalPhone className={styles.icon} />}
					<input
						type="tel"
						name="phone"
						placeholder="Telephone number"
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.phone}
					/>
				</div>
				{validationErrors.phone && (
					<p className="text-danger font-size-12">{validationErrors.phone}</p>
				)}
				{/* General Firebase Error */}
				{error && (
					<p className="text-danger text-center font-size-12">{error}</p>
				)}
				<button type="submit" className="btn orange-btn">
					Register
				</button>
			</form>

			<p className="gray-light py-3 text-center font-size-14 mb-0">
				Already an account?{" "}
				<span onClick={() => navigate("/sign-in")} className="orange">
					Sign in
				</span>
			</p>
		</div>
	);
};

export default SignUpWithEmail;
