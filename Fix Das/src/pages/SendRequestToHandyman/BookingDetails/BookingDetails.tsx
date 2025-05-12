import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ClientRequest, Handyman } from "../../../types/types";
import { IoChevronBack } from "react-icons/io5";
import { LuClock3, LuMapPin } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchHandymanById } from "../../../api/handymen";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./BookingDetails.module.css";
import { TbCurrentLocation } from "react-icons/tb";
import { getFormData, updateFormData } from "../../../utils";
import { useUserStore } from "../../../store/userStore";
import { postRequest } from "../../../api/requests";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BookingDetails = () => {
	const { handymanId } = useParams<{ handymanId: string }>();
	const user = useUserStore((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();

	const [handyman, setHandyman] = useState<Handyman | null>(null);
	const [message, setMessage] = useState("");
	const [address, setAddress] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [lat, setLat] = useState<number | null>(null);
	const [lon, setLon] = useState<number | null>(null);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	const handleClose = (_: string, reason: string) => {
		if (reason === "backdropClick" || reason === "escapeKeyDown") {
			return;
		}
		setOpen(false);
	};

	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "80%",
		bgcolor: "background.paper",
		borderRadius: "8px",
		boxShadow: 24,
		p: 4,
	};

	useEffect(() => {
		const formData = getFormData();
		if (formData.address) {
			setAddress(formData.address as string);
		}
		if (formData.message) {
			setMessage(formData.message as string);
		}
		if (formData.selectedDate) {
			setSelectedDate(formData.selectedDate as string);
		}
		if (formData.selectedTime) {
			setSelectedTime(formData.selectedTime as string);
		}
		if (formData.lat) setLat(formData.lat as number);
		if (formData.lon) setLon(formData.lon as number);
	}, [location.state]);

	useEffect(() => {
		const getHandyman = async () => {
			if (handymanId) {
				const data = await fetchHandymanById(handymanId);
				setHandyman(data);
			}
		};

		getHandyman();
	}, [handymanId]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const hasAddress = address.trim() !== "";

		const newRequest: ClientRequest = {
			id: crypto.randomUUID(),
			from: {
				id: user?.id,
				name: user?.username,
				role: "client",
			},
			to: {
				id: handyman?.id,
				role: "handyman",
			},
			message: message,
			location: {
				address: hasAddress ? address : "",
				lat: hasAddress ? lat : null,
				lon: hasAddress ? lon : null,
			},
			time: selectedTime,
			date: selectedDate,
		};

		updateFormData(newRequest);
		try {
			await postRequest(newRequest);
			handleOpen();
		} catch (error) {
			console.error("Failed to send request:", error);
		}
	};

	if (!handyman) return <p>Loading handyman profile...</p>;

	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<form
					onSubmit={handleSubmit}
					className="container py-3 font-size-14"
					style={{ paddingBottom: "78px" }}
				>
					<div
						className="d-flex gap-2 align-items-center mb-4"
						onClick={() => navigate(`/bookings/calendar/${handymanId}`)}
					>
						<IoChevronBack style={{ fontSize: "20px", cursor: "pointer" }} />
						<p className="mb-0" style={{ fontSize: "16px" }}>
							Datum/Zeit
						</p>
					</div>

					<div>
						<p className="font-weight-700">Serviceanfrage</p>
						<div className="d-flex justify-content-between bg-white p-2 border-top mb-3">
							{selectedDate && <p className="mb-0">{selectedDate}</p>}
							<div className="d-flex align-items-center gap-2">
								<LuClock3 color="#5584E5" size={15} />
								<p className="mb-0">{selectedTime}</p>
							</div>
						</div>
					</div>
					{/* handyman card */}
					<div key={handyman?.id} className="border-bottom bg-white p-2">
						<div className="d-flex justify-content-between mb-4">
							<div className="d-flex gap-1 align-items-center">
								<div style={{ width: "36px", height: "36px" }}>
									<img
										src="/LandingPage/testimonials/client1.svg"
										alt="User image"
										className="w-100 h-100 rounded-circle"
									/>
								</div>

								<div>
									<div className="d-flex gap-2 align-items-center mb-1">
										<p
											className="font-size-14 font-weight-700 mb-0"
											style={{ color: "#080808" }}
										>
											{handyman?.name}
											<span>
												<MdVerified color="#1461F0" />
											</span>
										</p>
									</div>

									<div className="d-flex gap-1">
										<LuMapPin color="#5584E5" />
										<p className="font-size-12 fontt-weight-400 mb-0">
											{handyman?.location}
										</p>
									</div>
								</div>
							</div>

							<div className="d-flex flex-column justify-content-between">
								<p
									className="mb-0 font-size-10 font-weight-600 rounded p-1"
									style={{ color: "#38830A", backgroundColor: "#C3E2B0" }}
								>
									Now available
								</p>
								<div className="d-flex gap-2 align-items-center">
									<FaStar color="#F5CE47" />
									<p className="font-size-10 font-weight-600 mb-0">
										{handyman?.stars}
									</p>
								</div>
							</div>
						</div>

						<div
							className="d-flex flex-wrap gap-2 font-size-12 font-weight-700"
							style={{ color: "#5584E5" }}
						>
							{handyman.categories.map((category) => (
								<p
									key={crypto.randomUUID()}
									style={{ backgroundColor: "#E8EFFE" }}
									className="p-1 mb-0"
								>
									{category}
								</p>
							))}
						</div>
					</div>
					{/* textarea */}
					<div>
						<label htmlFor="message" className="font-weight-700 py-3 pb-2">
							Geben Sie Ihre Anfrage an &nbsp;
							<span
								style={{ color: "#1461F0" }}
								className="font-weight-400 font-size-12"
							>
								Optional
							</span>
						</label>
						<textarea
							id="message"
							name="message"
							placeholder="Deine Nachricht"
							className="w-100 border rounded p-2"
							style={{ resize: "none", outline: "none" }}
							rows={4}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>
					<div>
						<label htmlFor="address" className="font-weight-700 py-3 pb-2">
							Was ist deine Adresse? &nbsp;
							<span
								style={{ color: "#1461F0" }}
								className="font-weight-400 font-size-12"
							>
								Optional
							</span>
						</label>
						<div className={styles.inputWrapper}>
							{<LuMapPin className={styles.icon} />}
							<input
								id="address"
								name="address"
								placeholder="Gib deine Adresse ein"
								className={`form-control input-field ${styles.inputField}`}
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<span
								className={styles.locationIcon}
								role="button"
								onClick={() => {
									updateFormData({
										message,
										address,
									});
									navigate(`/bookings/enter-location/${handymanId}`);
								}}
							>
								<TbCurrentLocation color="#939393" />
							</span>
						</div>
					</div>

					<div className="py-4">
						<button type="submit" className="orange-btn">
							Anfrage senden
						</button>
					</div>

					{/* Modal */}
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-title"
						aria-describedby="modal-description"
						className="text-center"
					>
						<Box sx={modalStyle}>
							<div>
								<img src="/Checkmark.png" alt="Checkmark" />
							</div>
							<Typography id="modal-title" variant="h6" component="h2">
								Anfrage Gesendet!
							</Typography>
							<Typography
								id="modal-description"
								sx={{ mt: 2, color: "#939393" }}
								className="font-size-24"
							>
								Der Handwerker wird so schnell wie möglich antworten.
							</Typography>
							<div className="py-3">
								<button
									className="orange-btn w-50 font-size-12"
									onClick={() => navigate("/homepage")}
								>
									Startseite
								</button>
							</div>
						</Box>
					</Modal>
				</form>
			</div>
			<Navbar />
		</>
	);
};

export default BookingDetails;
