import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import CalendarComponent from "./components/CalendarComponent";

const CalendarPage = () => {
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
							<CalendarComponent />
						</div>
					</div>
					<div>
						<p className="font-size-14 font-weight-700 pt-4">
							Verfügbare Zeiten
						</p>
						<div className="d-flex align-items-center justify-content-between gap-1 py-3">
							<div
								className="d-flex flex-column justify-content-center align-items-center border rounded-2 p-1 px-2"
								style={{ width: "100px" }}
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
							>
								<img
									src="/bookings/meteo-icons/meteoicon_evening.svg"
									alt="Sun in the evening"
								/>
								<p className="font-size-12 font-weight-600 mb-0">4pm-8pm</p>
							</div>
						</div>
					</div>
					<button className="orange-btn">Weiter</button>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default CalendarPage;
