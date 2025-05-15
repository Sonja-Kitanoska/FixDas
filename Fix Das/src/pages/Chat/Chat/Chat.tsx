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
import { formatDistanceToNow } from "date-fns";
import { IoSearch } from "react-icons/io5";
import styles from "./Chat.module.css";
import { useNavigate } from "react-router-dom";

interface Message {
	handymanId: string;
	handymanName: string;
	text: string;
	createdAt: Date;
}

const Chat = () => {
	const user = useUserStore((state) => state.user);
	const [handymanChats, setHandymanChats] = useState<Message[]>([]);
	const [allMessages, setAllMessages] = useState<Message[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

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
			const allMessagesArr: Message[] = [];

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
				allMessagesArr.push({
					handymanId,
					handymanName: data.role === "client" ? "" : data.user,
					text: data.text,
					createdAt: data.createdAt.toDate(),
				});
			});

			setHandymanChats(Object.values(latestMessages));
			setAllMessages(allMessagesArr);
		};

		fetchMessages();
	}, [user?.id, db]);

	const filteredAllMessages = allMessages.filter((msg) => {
		const term = searchTerm.trim().toLowerCase();
		return (
			msg.handymanName.toLowerCase().includes(term) ||
			msg.text.toLowerCase().includes(term)
		);
	});

	const filteredHandymanIds = Array.from(
		new Set(filteredAllMessages.map((msg) => msg.handymanId))
	);

	const filteredChats = handymanChats.filter((chat) =>
		filteredHandymanIds.includes(chat.handymanId)
	);

	return (
		<>
			<div style={{ paddingBottom: "78px" }} className="min-vh-100">
				<div className="py-3 container">
					<div className=" position-fixed top-0 start-0 end-0 z-3 bg-white container">
						<div className="d-flex justify-content-between py-4 border-bottom">
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
					</div>
					<div style={{ paddingTop: "50px" }}>
						{/* Search  */}
						<div className={`${styles.inputWrapper} py-4`}>
							{<IoSearch className={styles.icon} />}
							<input
								type="text"
								name="search"
								placeholder="Search conversation"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={`form-control input-field ${styles.inputField}`}
							/>
						</div>
						{/* Chats */}
						{filteredChats.map((chat) => (
							<div
								key={chat.handymanId}
								style={{
									padding: "10px",
									borderRadius: "5px",
								}}
								className="border-bottom mb-3 d-flex gap-4 align-items-start"
								onClick={() => {
									const id = `${user?.id}_${chat.handymanId}`;
									navigate(`/chat/${id}`, {
										state: {
											handyman: {
												name: chat.handymanName,
												id: chat.handymanId,
											},
										},
									});
								}}
							>
								<div style={{ width: "48px", height: "48px" }}>
									<img
										src="https://picsum.photos/200/300?random=1"
										alt="handyman-image"
										className="w-100 h-100 object-fit-cover"
										style={{ borderRadius: "12px" }}
									/>
								</div>

								<div>
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
										{formatDistanceToNow(chat.createdAt, { addSuffix: true })}
									</small>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<Navbar />
		</>
	);
};

export default Chat;
