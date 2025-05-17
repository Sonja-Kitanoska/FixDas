import { FaRegBookmark } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { ClientAddData } from "../../../../../types/types";
import { useUserStore } from "../../../../../store/userStore";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import MapModal from "../../../../../components/MapModal/MapModal";
const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;

const ClientAddCard = ({ add }: { add: ClientAddData }) => {
	const user = useUserStore((state) => state.user);
	const [showMap, setShowMap] = useState(false);
	const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
		null
	);
	const handleShowMap = async () => {
		try {
			const response = await fetch(
				`https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_TOKEN}&q=${encodeURIComponent(
					add.location.address
				)}&format=json`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch geolocation");
			}

			const data = await response.json();

			if (data && data.length > 0) {
				const { lat, lon } = data[0];
				setCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });
				setShowMap(true);
			} else {
				alert("No coordinates found for this address.");
			}
		} catch (error) {
			console.error("Geocoding failed", error);
			alert("Couldn't load map for this address.");
		}
	};

	return (
		<div
			className="p-3 bg-white rounded-2 card"
			style={{ borderColor: "#E9E9E9" }}
		>
			<div className="d-flex justify-content-between mb-4">
				<div className="d-flex gap-2 align-items-center">
					<div style={{ width: "36px", height: "36px" }}>
						<img
							src="/LandingPage/testimonials/client1.svg"
							alt="User image"
							className="w-100 h-100 rounded-circle"
						/>
					</div>

					<div>
						<div className="d-flex align-items-center">
							<p
								className="font-size-14 font-weight-700 mb-0"
								style={{ color: "#080808" }}
							>
								{user?.username}
							</p>
						</div>
						<p className="mb-0 font-size-10" style={{ color: "#939393" }}>
							Vertrauenswurdig
						</p>
					</div>
				</div>

				<div className="d-flex gap-2 rounded-1">
					<div>
						<p
							className="mb-0 font-size-10 font-weight-600  px-1"
							style={{ color: "#38830A", backgroundColor: "#C3E2B0" }}
						>
							DRINGEND
						</p>
					</div>

					<FaRegBookmark color="#1461F0" />
				</div>
			</div>

			<div className="d-flex justify-content-between align-items-center border-bottom pb-2">
				<p className="font-weight-700 font-size-14 mb-0">{add.title}</p>
				<p
					style={{ color: "#939393", fontSize: "10px" }}
					className="mb-0 font-weight-400"
				>
					{formatDistanceToNow(new Date(add.createdAt), { addSuffix: true })}
				</p>
			</div>

			<p className="font-size-12 font-weight-400 py-3 mb-0">
				{add.description}
			</p>

			<div className="d-flex justify-content-between border-bottom pb-2">
				<div className="d-flex gap-1 pb-3">
					<LuMapPin color="#5584E5" />
					<p className="font-size-12 font-weight-400 mb-0">
						{add.location.address}
					</p>
				</div>
				<p
					className="font-size-10 mb-0"
					style={{ color: "#1461F0" }}
					onClick={handleShowMap}
				>
					Auf der Karte anzeigen
				</p>
			</div>
			{showMap && coords && (
				<MapModal
					lat={coords.lat}
					lon={coords.lon}
					onClose={() => setShowMap(false)}
				/>
			)}

			{/* <div className="d-flex justify-content-end font-size-12 font-weight-600 pt-3">
				<button className="orange-btn" style={{ width: "110px" }}>
					Contact
				</button>
			</div> */}
		</div>
	);
};

export default ClientAddCard;
