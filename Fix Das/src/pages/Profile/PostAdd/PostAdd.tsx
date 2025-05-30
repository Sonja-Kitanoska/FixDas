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
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;

const PostAdd = () => {
	const { user } = useUserStore();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const reverseGeocode = async (
		lat: number,
		lon: number
	): Promise<string | null> => {
		try {
			const res = await fetch(
				`https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_TOKEN}&lat=${lat}&lon=${lon}&format=json`
			);
			const data = await res.json();
			const address = `${data.address.road || ""}, ${
				data.address.city || data.address.town || data.address.village || ""
			}, ${data.address.postcode || ""}`;

			return address || null;
		} catch (err) {
			console.error("Reverse geocoding error:", err);
			return null;
		}
	};
	const forwardGeocode = async (
		address: string
	): Promise<{ lat: number; lon: number } | null> => {
		try {
			const res = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
					address
				)}&limit=1`
			);
			const data = await res.json();
			if (data && data.length > 0) {
				return {
					lat: parseFloat(data[0].lat),
					lon: parseFloat(data[0].lon),
				};
			} else {
				return null;
			}
		} catch (error) {
			console.error("Forward geocoding error:", error);
			return null;
		}
	};

	const handleAddressBlur = async () => {
		console.log("Address on blur:", formData.location.address);
		if (formData.location.address.trim() === "") return;

		const coords = await forwardGeocode(formData.location.address);
		if (coords) {
			setFormData((prev) => ({
				...prev,
				location: {
					...prev.location,
					lat: coords.lat,
					lon: coords.lon,
				},
			}));
			console.log("Coords set:", coords);
		} else {
			alert("Adresse konnte nicht gefunden werden.");
		}
	};

	const handleGetCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const address = await reverseGeocode(latitude, longitude);

					if (address) {
						setFormData((prev) => ({
							...prev,
							location: {
								address,
								lat: latitude,
								lon: longitude,
							},
						}));
					} else {
						alert("Konnte Ihre Adresse nicht bestimmen.");
					}
				},
				(error) => {
					console.error("Location error:", error.message);
					if (error.code === error.PERMISSION_DENIED) {
						alert("Bitte erlaube den Standortzugriff in deinem Browser.");
					}
				}
			);
		}
	};

	const [formData, setFormData] = useState({
		title: "",
		image: "",
		description: "",
		location: {
			address: "",
			lat: 0,
			lon: 0,
		},
		images: [] as File[],
		isUrgent: false,
	});
	const [errors, setErrors] = useState<{ title?: string; location?: string }>(
		{}
	);

	const handleFileUploadClick = () => {
		const fileInput = document.getElementById("photoUpload");
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		const checked =
			type === "checkbox" && "checked" in e.target
				? (e.target as HTMLInputElement).checked
				: undefined;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
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

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFormData((prev) => ({
			...prev,
			location: {
				...prev.location,
				address: value,
			},
		}));

		if (errors.location) {
			setErrors((prev) => ({ ...prev, location: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { title?: string; location?: string } = {};

		if (!formData.title.trim()) {
			newErrors.title = "Bitte geben Sie einen Titel ein.";
		}

		if (!formData.location.address.trim()) {
			newErrors.location = "Bitte geben Sie einen Standort ein.";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			return;
		}

		let lat = formData.location.lat;
		let lon = formData.location.lon;
		const address = formData.location.address;

		if (address && (!lat || !lon)) {
			const coords = await forwardGeocode(address);
			if (coords) {
				lat = coords.lat;
				lon = coords.lon;
			}
		}
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
				image: user.image,
				description: formData.description,
				location: {
					address: address,
					lat: lat,
					lon: lon,
				},
				images,
				userId: user.id,
				createdAt: new Date().toISOString(),
				isUrgent: formData.isUrgent,
			};

			await postClientAdd(data);
			toast.success("Ad successfully sent!");

			setTimeout(() => {
				navigate("/profile");
			}, 1000);
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

				<form onSubmit={handleSubmit} className="font-size-14 pt-5" noValidate>
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
					{errors.title && (
						<div className="text-danger mt-1">{errors.title}</div>
					)}

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
								value={formData.location.address}
								onChange={handleLocationChange}
								onBlur={handleAddressBlur}
								placeholder="Gib deine Adresse ein"
								className={`form-control input-field ${styles.inputField} ${styles.inputFieldPaddingX}`}
							/>
							<span
								className={styles.locationIcon}
								role="button"
								onClick={handleGetCurrentLocation}
							>
								<TbCurrentLocation color="#939393" />
							</span>
						</div>
					</div>
					{errors.location && (
						<div className="text-danger mt-1">{errors.location}</div>
					)}

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
					<div className="d-flex gap-2 mb-4">
						<input
							className={`${styles.checkboxInput} form-check-input`}
							type="checkbox"
							id="isUrgent"
							name="isUrgent"
							checked={formData.isUrgent}
							onChange={handleChange}
						/>
						<label className="form-check-label" htmlFor="isUrgent">
							Post as urgent
						</label>
					</div>
					<button className="orange-btn">Post a job</button>
					{error && <div className="text-danger text-center">{error}</div>}
				</form>
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar
				transition={Slide}
				className="!w-auto max-w-[300px]"
				newestOnTop
				closeOnClick
				pauseOnHover
			/>
			<Navbar />
		</>
	);
};

export default PostAdd;
