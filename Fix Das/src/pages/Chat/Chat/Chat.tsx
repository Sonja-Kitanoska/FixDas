import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import Navbar from "../../../components/Navbar/Navbar";
import { useUserStore } from "../../../store/userStore";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

interface Message {
	handymanId: string;
	handymanName: string;
	text: string;
	createdAt: Date;
}

const Chat = () => {
	const user = useUserStore((state) => state.user);
	const [handymanChats, setHandymanChats] = useState<Message[]>([]);
	const db = getFirestore();

	useEffect(() => {
		const fetchMessages = async () => {
			const start = `${user?.id}_`;
			const end = `${user?.id}_\uf8ff`;

			const q = query(
				collection(db, "messages"),
				where("room", ">=", start),
				where("room", "<=", end),
				orderBy("room"),
				orderBy("createdAt", "desc")
			);

			const querySnapshot = await getDocs(q);

			const latestMessages: Record<string, Message> = {};

			querySnapshot.forEach((doc) => {
				const data = doc.data();
				const [clientId, handymanId] = data.room.split("_");

				if (clientId !== user?.id) return;

				if (!latestMessages[handymanId]) {
					latestMessages[handymanId] = {
						handymanId,
						handymanName: data.role === "client" ? "" : data.user,
						text: data.text,
						createdAt: data.createdAt.toDate(),
					};
				}
			});

			setHandymanChats(Object.values(latestMessages));
		};

		fetchMessages();
	}, [user?.id, db]);

	return (
		<>
			<div className="py-3 container">
				<div className="d-flex justify-content-between mb-3">
					<div className="d-flex align-items-center gap-1">
						<p className="mb-0 orange font-weight-700">Chat</p>
						<p
							style={{
								backgroundColor: "#E9E9E9",
								borderRadius: "24px",
							}}
							className="rounded font-size-12 text-center mb-0 px-2"
						>
							{handymanChats.length}
						</p>
					</div>
					<FaRegEdit size={20} color="#1461F0" />
				</div>
				{handymanChats.map((chat) => (
					<div
						key={chat.handymanId}
						style={{
							padding: "10px",
							borderRadius: "5px",
						}}
						className="border-bottom mb-3 d-flex gap-4 align-items-start"
					>
						<div style={{ width: "48px", height: "48px" }}>
							<img
								src="https://picsum.photos/200/300?random=1"
								alt="handyman-image"
								className="w-100 h-100 object-fit-cover"
							/>
						</div>

						<div className="">
							<h4 className="font-weight-700 font-weight-14">
								{chat.handymanName}
							</h4>
							<p className="font-size-12" style={{ color: "#939393" }}>
								{chat.text}
							</p>
						</div>
						<div className="ms-auto d-flex align-items-start">
							<small
								style={{ color: "#575757" }}
								className="font-size-14 font-weight-700 justify-end ms-auto"
							>
								12m
							</small>
						</div>
					</div>
				))}
			</div>

			<Navbar />
		</>
	);
};

export default Chat;
