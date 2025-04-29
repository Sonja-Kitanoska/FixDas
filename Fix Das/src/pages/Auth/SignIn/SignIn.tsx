import { useState } from "react";
import { IoChevronBack, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import styles from "./SignIn.module.css";
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	User,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const SignIn = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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
			if (error instanceof Error) console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleFacebookSignUp = async () => {
		if (loading) return; // Prevent multiple clicks while loading
		setLoading(true);
		try {
			const userCredentials = await signInWithPopup(auth, facebookProvider);
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
			if (error instanceof Error) console.log(error);
		} finally {
			setLoading(false);
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
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
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
			<p>Register with your account</p>

			<form onSubmit={handleSubmit}>
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
				<p className="orange font-size-12">Forgot password?</p>
				<div className="py-2">
					<button className="orange-btn">Register</button>
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

					<p className="mb-0">Continue with Googgle</p>
				</button>
				<button
					onClick={handleFacebookSignUp}
					className="btn login-btn mb-3 d-flex align-items-center justify-content-center gap-2"
				>
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
