import { MdOutlineLocalPhone, MdOutlineModeEdit } from "react-icons/md";
import Navbar from "../../../components/Navbar/Navbar";
import { LuMapPin } from "react-icons/lu";

const Profile = () => {
	const phoneNumber = "+41 987 654 321";

	const formatPhoneNumber = (number: string) => {
		// Adjusting regex to handle the '+' sign
		return number.replace(
			/\+(\d{2}) (\d{3}) (\d{3}) (\d{3})/,
			"+$1 $2 *** ***"
		);
	};

	return (
		<div className="container py-3">
			<div className="d-flex justify-content-between align-items-center">
				<p className="orange mb-0 font-weight-700">Konto</p>
				<img src="/notification-icon.svg" alt="Notifications icon" />
			</div>

			<div className="py-5 d-flex gap-3">
				<div className="d-flex flex-column justify-content-center">
					<img src="/Profile/ProfilePicture.svg" alt="Profile Image" />
					<p
						style={{ color: "#1461F0", fontSize: "10px" }}
						className="text-center"
					>
						Client
					</p>
				</div>
				<div className="w-100 font-size-14 font-weight-400">
					<div className="d-flex justify-content-between">
						<p className="mb-1 font-weight-700">Ana Muller</p>
						<MdOutlineModeEdit color="#1461F0" size={18} />
					</div>
					<p className="mb-1">annamuller@yahoo.com</p>
					<div className="d-flex align-items-center gap-1 mb-1">
						<LuMapPin color="#1461F0" /> <p className="mb-0">Ingolstadt</p>
					</div>
					<div className="d-flex align-items-center gap-1 mb-1">
						<MdOutlineLocalPhone />
						<p className="mb-0">{formatPhoneNumber(phoneNumber)}</p>
					</div>
				</div>
			</div>
			<div className="py-3">
				<p className="font-weight-700 mb-1">Post a New Ad</p>
				<p className="mb-0">
					Need help? Quickly create a new ad to request a service.
				</p>
			</div>
			<button className="orange-btn">Neue Anzeige erstellen</button>
			<div className="py-3">
				<p className="font-weight-700 mb-1">Meine Aktiven Anzeigen</p>
				<p className="mb-0">
					Sehen, bearbeiten oder löschen Sie Ihre derzeit aktiven Anzeigen für
					Serviceanfragen.
				</p>
			</div>
			<Navbar />
		</div>
	);
};

export default Profile;
