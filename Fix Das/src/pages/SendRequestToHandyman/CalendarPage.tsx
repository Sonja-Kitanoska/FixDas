import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import CalendarComponent from "./components/CalendarComponent";
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
	const [selectedDate, setSelectedDate] = useState<Value>(new Date());
	const [selectedTime, setSelectedTime] = useState("");

	const handleTimeClick = (time: string) => {
		setSelectedTime(time);
		console.log("Selected time:", time);
	};
	const timeSlots = [
		{
			label: "8am-12pm",
			icon: "/bookings/meteo-icons/meteoicon_morning.svg",
			alt: "Sun in the morning",
		},
		{
			label: "12pm-4pm",
			icon: "/bookings/meteo-icons/meteoicon_afternoon.svg",
			alt: "Sun in the afternoon",
		},
		{
			label: "4pm-8pm",
			icon: "/bookings/meteo-icons/meteoicon_evening.svg",
			alt: "Sun in the evening",
		},
	];
	const formatDate = (date: Date): string => {
		const weekday = new Intl.DateTimeFormat("en-US", {
			weekday: "long",
		}).format(date);
		const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
			date
		);
		const day = date.getDate();
		const year = date.getFullYear();
		return `${weekday}, ${month} ${day} ${year}`;
	};

	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<div className="container py-3" style={{ paddingBottom: "78px" }}>
					<div className="d-flex gap-2 align-items-center mb-4">
						<IoChevronBack style={{ fontSize: "20px", cursor: "pointer" }} />
						<p className="mb-0">Zum Profil</p>
					</div>
					<div>
						<p className="font-size-14 font-weight-700 py-2">Datum auswählen</p>
						<div className="d-flex justify-content-center">
							<CalendarComponent
								value={selectedDate}
								onChange={setSelectedDate}
							/>
						</div>
					</div>
					<div>
						<p className="font-size-14 font-weight-700 pt-4">
							Verfügbare Zeiten
						</p>
						{/* <div className="d-flex align-items-center justify-content-between gap-1 py-3">
							<div
								className="d-flex flex-column justify-content-center align-items-center border rounded-2 p-1 px-2"
								style={{ width: "100px" }}
								onClick={handleTimeClick}
							>
								<img
									src="/bookings/meteo-icons/meteoicon_morning.svg"
									alt="Sun in the morning"
								/>
								<p className="font-size-12 font-weight-600 mb-0">8am-12pm</p>
							</div>
							<div
								className="d-flex flex-column justify-content-center align-items-center border rounded-2 p-1 px-2"
								style={{ width: "100px" }}
								onClick={handleTimeClick}
							>
								<img
									src="/bookings/meteo-icons/meteoicon_afternoon.svg"
									alt="Sun in the afternoon"
								/>
								<p className="font-size-12 font-weight-600 mb-0">12pm-4pm</p>
							</div>
							<div
								className="d-flex flex-column justify-content-center align-items-center border rounded-2 p-1 px-2"
								style={{ width: "100px" }}
								onClick={handleTimeClick}
							>
								<img
									src="/bookings/meteo-icons/meteoicon_evening.svg"
									alt="Sun in the evening"
								/>
								<p className="font-size-12 font-weight-600 mb-0">4pm-8pm</p>
							</div>
						</div> */}
						<div className="d-flex align-items-center justify-content-between gap-1 py-3">
							{timeSlots.map((slot) => (
								<div
									key={slot.label}
									onClick={() => handleTimeClick(slot.label)}
									className="d-flex flex-column justify-content-center align-items-center rounded-2 p-1 px-2"
									style={{
										width: "100px",
										border:
											selectedTime === slot.label
												? "1px solid #1461F0"
												: "1px solid #dee2e6",
									}}
								>
									<img src={slot.icon} alt={slot.alt} />
									<p className="font-size-12 font-weight-600 mb-0">
										{slot.label}
									</p>
								</div>
							))}
						</div>
					</div>
					<button
						className="orange-btn"
						onClick={() => {
							if (selectedDate instanceof Date) {
								console.log("Selected date:", formatDate(selectedDate));
							}
						}}
					>
						Weiter
					</button>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default CalendarPage;
