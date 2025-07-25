import { FaRegBookmark } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { ClientAddData } from "../../../../../types/types";
import { useUserStore } from "../../../../../store/userStore";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import MapModal from "../../../../../components/MapModal/MapModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

const ClientAddCard = ({ add }: { add: ClientAddData }) => {
	const user = useUserStore((state) => state.user);
	const [showMap, setShowMap] = useState(false);
	const [imageURL, setImageURL] = useState<string | null>(null);

	const fetchUserImage = async (userId: string) => {
		try {
			const docRef = doc(db, "users", userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.error("No such document!");
				return null;
			}
		} catch (error) {
			console.error("Error fetching user details:", error);
			return null;
		}
	};

	useEffect(() => {
		const getUserDetails = async () => {
			if (!user) return;
			const data = await fetchUserImage(user.id);
			if (data) {
				setImageURL(data.image);
			}
		};

		getUserDetails();
	}, [user]);

	const handleShowMap = () => {
		setShowMap(true);
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
							src={imageURL || "/avatar.jpg"}
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
						{add.isUrgent && (
							<p
								className="mb-0 font-size-10 font-weight-600  px-1"
								style={{ color: "#38830A", backgroundColor: "#C3E2B0" }}
							>
								DRINGEND
							</p>
						)}
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
			{showMap && add.location.lat && add.location.lon && (
				<MapModal
					lat={add.location.lat}
					lon={add.location.lon}
					onClose={() => setShowMap(false)}
				/>
			)}
		</div>
	);
};

export default ClientAddCard;
