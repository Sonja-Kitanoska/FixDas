import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import styles from "./SignUp.module.css";
import SmartImage from "../../../components/SmartImage/SmartImage";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { createUser } from "../../../api/users";

const provider = new GoogleAuthProvider();

const SignUp = () => {
	const setUser = useUserStore((state) => state.setUser);

	const setLoading = useUserStore((state) => state.setLoading);
	const loading = useUserStore((state) => state.loading);

	const selectedRole = useUserStore((state) => state.selectedRole);
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleGoogleSignUp = async () => {
		// if (loading) return; // Prevent multiple clicks while loading
		setLoading(true);
		try {
			const userCredentials = await signInWithPopup(auth, provider);
			if (userCredentials) {
				const user: User = userCredentials.user;

				const userRef = doc(db, "users", user.uid);
				const userSnap = await getDoc(userRef);

				const newUser = {
					id: user.uid,
					email: user.email,
					username: user.displayName,
					phone: user.phoneNumber,
					role: selectedRole,
					createdAt: new Date().toISOString(),
				};

				if (!userSnap.exists()) {
					await setDoc(userRef, newUser);
				}
				setUser(newUser);
				createUser(newUser);

				setLoading(false);
				navigate("/homepage");
			}
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === "auth/email-already-in-use") {
					setError(
						"This email is already in use. Try logging in or using a different email."
					);
				} else {
					setError("Failed to sign up. Please try again.");
				}
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-fluid pb-3">
			{loading && <LoadingSpinner />}
			<div className="text-center p-3">
				{/* <img src="./logo.svg" alt="Logo" /> */}
				<SmartImage src="/logo.svg" alt="Logo" width={120} height={120} />
			</div>
			<div className={`${styles.divider} d-flex justify-content-evenly mb-5`}>
				<p className="font-size-12 font-weight-600 orange">
					Register as customers
				</p>
				<p className="font-size-12 font-weight-600">Register as craftsmen</p>
			</div>

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
			<button
				onClick={() => navigate("/sign-up-email")}
				className="btn login-btn mb-5 d-flex align-items-center justify-content-center gap-2"
			>
				<img src="coloured-icons/Logo-Email.svg" alt="Email logo" />
				<p className="mb-0"> With email</p>
			</button>

			<button
				onClick={() => navigate("/sign-in")}
				className="btn orange-btn mb-3"
			>
				Register
			</button>
			<p className="font-size-12 text-center" style={{ color: "red" }}>
				{error}
			</p>

			<p className="gray-light my-3 text-center font-size-14 mb-0">
				Already an account?{" "}
				<span onClick={() => navigate("/sign-in")} className="orange">
					Register
				</span>
			</p>
		</div>
	);
};

export default SignUp;
