import styles from "./SignUpWithEmail.module.css";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignUpWithEmail = () => {
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

	const toggleConfirmPasswordVisibility = () => {
		setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
	};
	return (
		<div className="container-fluid">
			<div className="text-center p-3">
				<img src="./logo.svg" alt="Logo" />
			</div>
			<div className={`${styles.divider} d-flex justify-content-evenly mb-4`}>
				<p className="font-size-12 font-weight-600">Register as customers</p>
				<p className="font-size-12 font-weight-600">Register as craftsmen</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputWrapper}>
					<FaRegUser className={styles.icon} />
					<input
						type="text"
						placeholder="Name"
						name="name"
						required
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.name}
					/>
				</div>
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
				<div className={styles.inputWrapper}>
					{<TbLockPassword className={styles.icon} />}
					<input
						type={isConfirmPasswordVisible ? "text" : "password"}
						name="confirmPassword"
						placeholder="Confirm password"
						required
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
				<div className={styles.inputWrapper}>
					{<MdOutlineLocalPhone className={styles.icon} />}
					<input
						type="tel"
						name="phone"
						placeholder="Telephone number"
						required
						className={`form-control input-field mb-3 ${styles.inputField}`}
						onChange={handleChange}
						value={formData.phone}
					/>
				</div>
				<button type="submit" className="btn orange-btn">
					Register
				</button>
			</form>

			<p className="gray-light my-3 text-center font-size-14">
				Already an account? <span className="orange">Register</span>
			</p>
		</div>
	);
};

export default SignUpWithEmail;
