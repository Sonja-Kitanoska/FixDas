import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import CalendarComponent from "./components/CalendarComponent";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Handyman } from "../../../types/types";
import { fetchHandymanById } from "../../../api/handymen";
import { getFormData, updateFormData } from "../../../utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
	const [selectedDate, setSelectedDate] = useState<Value>(new Date());
	const [selectedTime, setSelectedTime] = useState("");
	const navigate = useNavigate();
	const { handymanId } = useParams();
	const [handyman, setHandyman] = useState<Handyman | null>(null);
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);

	useEffect(() => {
		const getHandyman = async () => {
			if (handymanId) {
				const data = await fetchHandymanById(handymanId);
				setHandyman(data);
				if (data?.unavailableDates) {
					const parsedDates = data.unavailableDates.map(
						(dateStr: string) => new Date(dateStr)
					);
					setDisabledDates(parsedDates);
				}
			}
		};

		getHandyman();

		const storedData = getFormData();
		if (storedData.selectedDate) {
			setSelectedDate(new Date(storedData.selectedDate as string));
		}
		if (storedData.selectedTime) {
			setSelectedTime(storedData.selectedTime as string);
		}
	}, [handymanId]);

	if (!handyman) return <p>Loading handyman profile...</p>;

	const handleTimeClick = (time: string) => {
		setSelectedTime(time);
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
			<div style={{ paddingBottom: "78px" }}>
				<div
					className="container py-3"
					style={{ minHeight: "calc(100vh - 78px)" }}
				>
					<div
						className="d-flex gap-2 align-items-center mb-4"
						onClick={() =>
							navigate(`/homepage/handyman-public-profile/${handymanId}`)
						}
					>
						<IoChevronBack style={{ fontSize: "20px", cursor: "pointer" }} />
						<p className="mb-0">Zum Profil</p>
					</div>
					<div>
						<p className="font-size-14 font-weight-700 py-2">Datum auswählen</p>
						<div className="d-flex justify-content-center">
							<CalendarComponent
								value={selectedDate}
								onChange={setSelectedDate}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
					<div>
						<p className="font-size-14 font-weight-700 pt-4">
							Verfügbare Zeiten
						</p>
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
						disabled={selectedTime === ""}
						onClick={() => {
							const formattedDate = formatDate(selectedDate as Date);
							updateFormData({
								selectedDate: formattedDate,
								selectedTime,
							});
							navigate(`/bookings/booking-details/${handymanId}`, {
								state: {
									selectedDate: formatDate(selectedDate as Date),
									selectedTime,
								},
							});
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
