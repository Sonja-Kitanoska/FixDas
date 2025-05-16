// import { IoChevronBack } from "react-icons/io5";
// import { MdOutlineEmail } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import styles from "./ResetPassword.module.css";

// const ResetPassword = () => {
// 	const navigate = useNavigate();
// 	return (
// 		<div className="container py-4 " >
// 			<IoChevronBack
// 				onClick={() => navigate("/sign-up")}
// 				style={{ fontSize: "20px" }}
// 				className="mb-4"
// 			/>
// 			<h6 style={{ fontSize: "24px" }} className="font-weight-400">
// 				Reset password
// 			</h6>
// 			<p className="font-size-14">
// 				Enter your email address, we will send you a confirmation code by email
// 				.
// 			</p>

// 			<form className="d-flex flex-column flex-grow-1">
// 				<div className={styles.inputWrapper}>
// 					<MdOutlineEmail className={styles.icon} />
// 					<input
// 						type="email"
// 						name="email"
// 						placeholder="Email"
// 						required
// 						className={`form-control input-field mb-3 ${styles.inputField}`}
// 					/>
// 				</div>
// 				<div className="py-2 mt-auto">
// 					<button className="orange-btn">Reset Password</button>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default ResetPassword;

import { IoChevronBack } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import { useState } from "react";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage("");
		setError("");

		try {
			await sendPasswordResetEmail(auth, email);
			setMessage("A password reset email has been sent.");
			setTimeout(() => {
				navigate("/sign-in");
			}, 3000);
		} catch (err: unknown) {
			console.log(err);
			setError("Failed to send reset email. Check the email address.");
		}
	};

	return (
		<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
			<div className="container py-4 d-flex flex-column flex-grow-1">
				<IoChevronBack
					onClick={() => navigate("/sign-up")}
					style={{ fontSize: "20px", cursor: "pointer" }}
					className="mb-4"
				/>

				<h6 style={{ fontSize: "24px" }} className="font-weight-400">
					Reset password
				</h6>
				<p className="font-size-14">
					Enter your email address, we will send you a confirmation code by
					email.
				</p>

				<form
					className="d-flex flex-column flex-grow-1"
					onSubmit={handleSubmit}
				>
					<div>
						<div className={styles.inputWrapper}>
							<MdOutlineEmail className={styles.icon} />
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className={`form-control input-field mb-3 ${styles.inputField}`}
							/>
						</div>
					</div>
					{message && <p className="text-success">{message}</p>}
					{error && <p className="text-danger">{error}</p>}

					<div className="py-3 mt-auto">
						<button type="submit" className="orange-btn w-100">
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
