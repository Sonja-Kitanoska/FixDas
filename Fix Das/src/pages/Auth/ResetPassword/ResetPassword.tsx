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

const ResetPassword = () => {
	const navigate = useNavigate();
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

				<form className="d-flex flex-column flex-grow-1">
					<div>
						<div className={styles.inputWrapper}>
							<MdOutlineEmail className={styles.icon} />
							<input
								type="email"
								name="email"
								placeholder="Email"
								required
								className={`form-control input-field mb-3 ${styles.inputField}`}
							/>
						</div>
					</div>
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
