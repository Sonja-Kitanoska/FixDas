import { MdOutlineLocalPhone, MdOutlineModeEdit } from "react-icons/md";
import Navbar from "../../../components/Navbar/Navbar";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ClientAddCard from "./components/ClientAddCard/ClientAddCard";
import { useUserStore } from "../../../store/userStore";
import { useEffect, useState } from "react";
import { fetchUserClientAdds } from "../../../api/fetchUserClientAdds";
import { ClientAddData } from "../../../types/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const Profile = () => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	const [clientAdds, setClientAdds] = useState<ClientAddData[]>([]);
	const [userDetails, setUserDetails] = useState<{
		location?: string;
		phone?: string;
		image?: string;
	} | null>(null);

	const fetchUserDetails = async (userId: string) => {
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
		const getAdds = async () => {
			if (!user) return;
			const adds: ClientAddData[] = await fetchUserClientAdds(user.id);
			setClientAdds(adds);
		};
		const getUserDetails = async () => {
			if (!user) return;
			const data = await fetchUserDetails(user.id);
			if (data) {
				setUserDetails({
					location: data.location,
					phone: data.phone,
					image: data.image,
				});
			}
		};

		getAdds();
		getUserDetails();
	}, [user]);

	const formatPhoneNumber = (number: string | undefined | null) => {
		if (!number) {
			return;
		}
		const cleaned = number.replace(/[^\d+]/g, "");

		const match = cleaned.match(/^(\+?\d+)(\d{3})(\d{3})$/);
		if (!match) return number;

		const [, start, ,] = match;
		return `${start} *** ***`;
	};

	return (
		<>
			<div className="py-3 vh-100">
				<div className="container" style={{ paddingBottom: "78px" }}>
					<div className="d-flex justify-content-between align-items-center">
						<p className="orange mb-0 font-weight-700">Konto</p>
						<img
							onClick={() => navigate("/profile/notifications")}
							src="/notification-icon.svg"
							alt="Notifications icon"
						/>
					</div>

					<div className="pt-4 d-flex gap-3">
						<div className="d-flex flex-column justify-content-center">
							<div style={{ width: "67px", height: "67px" }}>
								<img
									src={
										user?.image?.length
											? user.image
											: userDetails?.image?.length
											? userDetails.image
											: "/avatar.jpg"
									}
									alt="Profile Image"
									className="w-100 h-100 rounded-circle object-fit-cover"
								/>
							</div>
							<p
								style={{ color: "#1461F0", fontSize: "10px" }}
								className="text-center mb-0"
							>
								Client
							</p>
						</div>
						<div className="w-100 font-size-14 font-weight-400">
							<div className="d-flex justify-content-between">
								<p className="mb-1 font-weight-700">{user?.username}</p>
								<MdOutlineModeEdit
									color="#1461F0"
									size={18}
									onClick={() => navigate("/profile/edit")}
								/>
							</div>
							<p className="mb-1">{user?.email}</p>
							{userDetails?.location && (
								<div className="d-flex align-items-center gap-1 mb-1">
									<LuMapPin color="#1461F0" />{" "}
									<p className="mb-0">{userDetails.location}</p>
								</div>
							)}
							{userDetails?.phone && (
								<div className="d-flex align-items-center gap-1 mb-1">
									<MdOutlineLocalPhone />
									<p className="mb-0">{formatPhoneNumber(userDetails.phone)}</p>
								</div>
							)}
						</div>
					</div>
					<div className="py-3">
						<p className="font-weight-700 mb-1">Post a New Ad</p>
						<p className="mb-0">
							Need help? Quickly create a new ad to request a service.
						</p>
					</div>
					<button
						onClick={() => navigate("/profile/post-add")}
						className="orange-btn"
					>
						Neue Anzeige erstellen
					</button>
					<div className="py-3">
						<p className="font-weight-700 mb-1">Meine Aktiven Anzeigen</p>
						<p className="mb-0">
							Sehen, bearbeiten oder löschen Sie Ihre derzeit aktiven Anzeigen
							für Serviceanfragen.
						</p>
					</div>
					<div className="d-flex flex-column gap-2">
						{clientAdds.length > 0 ? (
							clientAdds.map((add) => <ClientAddCard key={add.id} add={add} />)
						) : (
							<p className="mt-2 text-center">Keine aktiven Anzeigen.</p>
						)}
					</div>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default Profile;
