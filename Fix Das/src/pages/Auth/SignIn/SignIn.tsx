import { useState } from "react";
import { IoChevronBack, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import styles from "./SignIn.module.css";
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	User,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../api/users";
import { useUserStore } from "../../../store/userStore";
import { FirebaseError } from "firebase/app";

const provider = new GoogleAuthProvider();

const SignIn = () => {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});
	const [generalError, setGeneralError] = useState("");

	const validate = () => {
		const newErrors: typeof errors = { email: "", password: "" };
		let isValid = true;

		if (!formData.email.trim()) {
			newErrors.email = "Email is required.";
			isValid = false;
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
		) {
			newErrors.email = "Invalid email address.";
			isValid = false;
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleGoogleSignUp = async () => {
		if (loading) return; // Prevent multiple clicks while loading
		setLoading(true);
		try {
			const userCredentials = await signInWithPopup(auth, provider);
			if (userCredentials) {
				const user: User = userCredentials.user;

				const userRef = doc(db, "users", user.uid);
				const userSnap = await getDoc(userRef);

				if (!userSnap.exists()) {
					await setDoc(userRef, {
						id: user.uid,
						email: user.email,
						username: user.displayName,
						createdAt: Timestamp.now(),
					});
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				setGeneralError("Google sign-in failed. Please try again.");
			}
		} finally {
			setLoading(false);
			navigate("/homepage");
		}
	};

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: "",
		}));

		setGeneralError("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (loading) return;
		if (!validate()) return;

		setLoading(true);

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				formData.email,
				formData.password
			);
			const userFirebase = userCredential.user;

			const users = await fetchUsers();
			const currentUser = users.find(
				(user) => user.email === userFirebase.email
			);

			if (currentUser) {
				setUser(currentUser);
				navigate("/homepage");
			} else {
				setGeneralError(
					"We couldn't find your account details. Please contact support or sign up again."
				);
			}
		} catch (error) {
			let errorMessage = "Failed to sign in. Please try again.";
			if (error instanceof FirebaseError) {
				switch (error.code) {
					case "auth/user-not-found":
						errorMessage = "No user found with this email.";
						setErrors((prev) => ({ ...prev, email: errorMessage }));
						break;
					case "auth/wrong-password":
						errorMessage = "Incorrect password.";
						setErrors((prev) => ({ ...prev, password: errorMessage }));
						break;
					case "auth/invalid-email":
						errorMessage = "Invalid email address format.";
						setErrors((prev) => ({ ...prev, email: errorMessage }));
						break;
					default:
						setGeneralError(errorMessage);
				}
			}
		} finally {
			setLoading(false);
		}
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<div className="container py-4">
			<IoChevronBack
				onClick={() => navigate("/sign-up")}
				style={{ fontSize: "20px" }}
				className="mb-4"
			/>
			<h6 style={{ fontSize: "24px" }} className="font-weight-400">
				Welcome back
			</h6>
			<p className="font-size-14">Register with your account</p>

			<form onSubmit={handleSubmit} noValidate>
				<div className={styles.inputWrapper}>
					<MdOutlineEmail className={styles.icon} />
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.email}
					/>
				</div>
				{errors.email && (
					<p className="text-danger font-size-12">{errors.email}</p>
				)}
				<div className={styles.inputWrapper}>
					{<TbLockPassword className={styles.icon} />}
					<input
						type={isPasswordVisible ? "text" : "password"}
						name="password"
						placeholder="Password"
						required
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
				{errors.password && (
					<p className="text-danger font-size-12">{errors.password}</p>
				)}
				<p
					onClick={() => navigate("/reset-password")}
					className="orange font-size-12"
				>
					Forgot password?
				</p>
				{generalError && (
					<div className="text-danger font-size-14">{generalError}</div>
				)}
				<div className="py-2">
					<button className="orange-btn">Sign in</button>
				</div>
			</form>

			<p style={{ color: "#939393" }} className="text-center py-3">
				Or
			</p>

			<div>
				<button
					onClick={handleGoogleSignUp}
					className="btn login-btn mb-3 d-flex align-items-center justify-content-center gap-2"
				>
					<img src="coloured-icons/Logo-Google.svg" alt="Google logo" />

					<p className="mb-0">Continue with Google</p>
				</button>
				<button className="btn login-btn mb-3 d-flex align-items-center justify-content-center gap-2">
					<img src="coloured-icons/Logo-Facebook.svg" alt="Facebook logo" />
					<p className="mb-0"> Continue with Facebook</p>
				</button>
				<button className="btn login-btn mb-3 d-flex align-items-center justify-content-center gap-2">
					<img src="coloured-icons/Logo-Apple.svg" alt="Apple logo" />
					<p className="mb-0"> Continue with Apple</p>
				</button>
			</div>
		</div>
	);
};

export default SignIn;
