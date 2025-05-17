const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
	lat: number;
	lon: number;
	onClose: () => void;
}

const MapModal = ({ lat, lon, onClose }: MapModalProps) => {
	useEffect(() => {
		const map = L.map("map", {
			center: [lat, lon],
			zoom: 13,
		});

		L.tileLayer(
			`https://tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_TOKEN}`,
			{
				attribution:
					'&copy; <a href="https://www.locationiq.com/">LocationIQ</a>',
			}
		).addTo(map);

		setTimeout(() => {
			map.invalidateSize();
		}, 100);

		L.marker([lat, lon]).addTo(map);

		return () => {
			map.remove();
		};
	}, [lat, lon]);

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				backgroundColor: "rgba(0,0,0,0.5)",
				zIndex: 9999,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			onClick={onClose}
		>
			<div
				id="map"
				style={{ width: "80vw", height: "80vh", borderRadius: "10px" }}
				onClick={(e) => e.stopPropagation()}
			></div>
		</div>
	);
};

export default MapModal;
