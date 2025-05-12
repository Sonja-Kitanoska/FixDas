import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EnterLocation.module.css";
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useState } from "react";
import { updateFormData } from "../../../utils";
const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;

const EnterLocation = () => {
	const navigate = useNavigate();
	const { handymanId } = useParams();
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<Place[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

	console.log("LOCATIONIQ_TOKEN:", LOCATIONIQ_TOKEN);

	const reverseGeocode = async (lat: number, lon: number) => {
		try {
			// Use LocationIQ reverse geocoding API
			const response = await fetch(
				`https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_TOKEN}&lat=${lat}&lon=${lon}&format=json`
			);
			const data = await response.json();
			// Get address from response
			return data.display_name;
		} catch (error) {
			console.error("Error in reverse geocoding:", error);
			return null;
		}
	};

	const handleGetCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const address = await reverseGeocode(latitude, longitude);
					if (address) {
						updateFormData({ address, lat: latitude, lon: longitude });
						navigate(`/bookings/booking-details/${handymanId}`);
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
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	};
	const fetchSuggestions = async (value: string) => {
		if (!value) {
			setSuggestions([]);
			return;
		}

		try {
			const response = await fetch(
				`https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_TOKEN}&q=${encodeURIComponent(
					value
				)}&format=json&addressdetails=1&limit=5`
			);
			const data = await response.json();

			// If response is an array, set it
			if (Array.isArray(data)) {
				setSuggestions(data);
			} else {
				// fallback if error or unexpected response
				console.warn("Unexpected LocationIQ response:", data);
				setSuggestions([]);
			}
		} catch (err) {
			console.error("Error fetching suggestions:", err);
			setSuggestions([]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		fetchSuggestions(value);
	};

	interface Place {
		display_name: string;
		place_id: string;
		lat: string;
		lon: string;
	}

	const handleSelect = (place: Place) => {
		const address = place.display_name;
		const lat = parseFloat(place.lat);
		const lon = parseFloat(place.lon);
		setQuery(address);
		setSuggestions([]);
		setSelectedAddress(address);

		updateFormData({ address, lat, lon });
	};

	return (
		<div>
			<div style={{ minHeight: "100vh" }}>
				<div
					className="container py-3 font-size-14"
					style={{ paddingBottom: "78px" }}
				>
					<div
						className="d-flex gap-2 align-items-center mb-4"
						onClick={() => navigate(`/bookings/booking-details/${handymanId}`)}
					>
						<IoChevronBack style={{ fontSize: "20px", cursor: "pointer" }} />
						<p className="mb-0" style={{ fontSize: "16px" }}>
							Geben Sie Ihren Standort ein
						</p>
					</div>

					<div className={styles.inputWrapper}>
						{<IoSearch className={styles.icon} />}
						<input
							id="search"
							name="search"
							placeholder="Search"
							value={query}
							onChange={handleChange}
							className={`form-control input-field ${styles.inputField}`}
						/>
						<span
							className={styles.closeIcon}
							role="button"
							onClick={() => {
								setQuery("");
								setSelectedAddress("");
								setSuggestions([]);
							}}
						>
							<IoIosCloseCircleOutline color="red" />
						</span>
					</div>

					<ul
						style={{
							display: `${suggestions.length === 0 ? "none" : ""} `,
							listStyle: "none",
							padding: 0,
							marginTop: "4px",
							background: "#fff",
							border: "1px solid #ccc",
						}}
					>
						{suggestions.map((place) => (
							<li
								key={place.place_id}
								onClick={() => handleSelect(place)}
								style={{ padding: "8px", cursor: "pointer" }}
							>
								{place.display_name}
							</li>
						))}
					</ul>
					<div
						className="d-flex align-items-center gap-2 py-2 pt-4 border-bottom"
						onClick={handleGetCurrentLocation}
					>
						<TiLocationArrowOutline
							size={25}
							color="#FA6100"
							style={{ flexShrink: 0 }}
						/>
						<p className="mb-0">Verwenden Sie Ihren aktuellen Standort</p>
					</div>

					<div className="py-4">
						<p style={{ color: "#939393" }}>Suchergebnis</p>
						<div
							className="d-flex align-items-center gap-2"
							onClick={() => {
								if (selectedAddress) {
									updateFormData({ address: selectedAddress });
									navigate(`/bookings/booking-details/${handymanId}`);
								}
							}}
						>
							<TiLocationArrowOutline
								size={25}
								color="#FA6100"
								style={{ flexShrink: 0 }}
							/>
							<p className="mb-0">
								{selectedAddress || "Noch nichts ausgewählt"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EnterLocation;
