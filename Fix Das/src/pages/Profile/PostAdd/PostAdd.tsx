import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./PostAdd.module.css";
import { LuMapPin } from "react-icons/lu";
import { TbCurrentLocation } from "react-icons/tb";
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postClientAdd } from "../../../api/postClientAdd";
import { useUserStore } from "../../../store/userStore";

const PostAdd = () => {
	const { user } = useUserStore();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		location: "",
		images: [] as File[],
	});
	const [error, setError] = useState<string | null>(null);

	const handleFileUploadClick = () => {
		const fileInput = document.getElementById("photoUpload");
		if (fileInput) {
			fileInput.click();
		}
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFormData((prev) => ({
				...prev,
				images: Array.from(files),
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				images: [],
			}));
		}
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const images =
			formData.images.length > 0
				? formData.images
				: [
						`https://picsum.photos/400/200?random=${Math.floor(
							Math.random() * 1000
						)}`,
				  ];

		try {
			if (!user) {
				return;
			}

			const data = {
				id: crypto.randomUUID(),
				title: formData.title,
				description: formData.description,
				location: formData.location,
				images,
				userId: user.id,
				createdAt: new Date().toISOString(),
			};

			await postClientAdd(data);

			navigate("/profile");
		} catch (err) {
			if (err instanceof Error) {
				setError(`Something went wrong: ${err.message}`);
			} else {
				setError("An unknown error occurred. Please try again.");
			}
		}
	};

	return (
		<>
			<div className="container pt-3" style={{ paddingBottom: "80px" }}>
				<div className="d-flex justify-content-between align-items-center">
					<IoChevronBack
						onClick={() => navigate("/profile")}
						style={{ fontSize: "20px" }}
					/>
					<p className="orange mb-0 font-weight-700">Stelle ausschreiben</p>
					<img
						onClick={() => navigate("/profile/notifications")}
						src="/notification-icon.svg"
						alt="Notifications icon"
					/>
				</div>

				<form onSubmit={handleSubmit} className="font-size-14 pt-5">
					{/* Title */}
					<div className="mb-3">
						<label htmlFor="title" className="mb-2">
							Welche Dienstleistung benötigen Sie?
							<span className="orange">*</span>
						</label>
						<input
							type="text"
							id="title"
							name="title"
							onChange={handleChange}
							placeholder="Ein Rohrleck reparieren..."
							className={`form-control input-field ${styles.inputField}`}
						/>
					</div>
					{/* Description */}
					<div className="mb-3">
						<label htmlFor="description" className="mb-2">
							Beschreibung:
						</label>
						<textarea
							rows={5}
							id="description"
							name="description"
							onChange={handleChange}
							placeholder="Ein Rohr unter dem Waschbecken leckt Wasser. Ich habe bemerkt, dass sich Wasser auf dem Boden darum sammelt..."
							className="form-control"
						/>
					</div>
					{/* Location */}
					<div className="mb-3">
						<label htmlFor="location" className="mb-2">
							Standort:
							<span className="orange">*</span>
						</label>
						<div className={styles.inputWrapper}>
							<LuMapPin className={styles.icon} />
							<input
								type="text"
								id="location"
								name="location"
								onChange={handleChange}
								placeholder="Gib deine Adresse ein"
								className={`form-control input-field ${styles.inputField} ${styles.inputFieldPaddingLeft}`}
							/>
							<span className={styles.locationIcon} role="button">
								<TbCurrentLocation color="#939393" />
							</span>
						</div>
					</div>
					{/* Uploade photos */}
					<div className="mb-3">
						<label htmlFor="photoUpload" className="mb-2">
							Fotos hochladen:
						</label>
						<div onClick={handleFileUploadClick}>
							<input
								type="file"
								id="photoUpload"
								name="photoUpload"
								accept="image/*"
								multiple
								onChange={handleFileChange}
								style={{ display: "none" }}
							/>
							<div className={styles.uploadContent}>
								<span>
									<MdCloudUpload color="#FB8133" size={50} />
								</span>
								<p className="font-weight-600 font-size-10">
									Klicken Sie hier, um hochzuladen
								</p>
							</div>
						</div>
					</div>
					<button className="orange-btn">Post a job</button>
				</form>
			</div>

			<Navbar />
		</>
	);
};

export default PostAdd;
