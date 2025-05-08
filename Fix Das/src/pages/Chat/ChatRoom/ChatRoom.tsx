import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Role } from "../../../types/types";
import Navbar from "../../../components/Navbar/Navbar";
import { IoChevronBack } from "react-icons/io5";

type Message = {
	text: string;
	id: string;
	createdAt: Timestamp;
	user: string;
	room: string;
	role: Role;
};

const ChatRoom = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [lastClientMessageId, setLastClientMessageId] = useState<string | null>(
		null
	);

	const messagesRef = collection(db, "messages");

	const { handymanId } = useParams();

	const handyman = location.state?.handyman;

	useEffect(() => {
		const queryMessages = query(
			messagesRef,
			where("room", "==", handymanId),
			orderBy("createdAt")
		);
		const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
			const messages: Message[] = [];
			snapshot.forEach((doc) => {
				messages.push({ ...(doc.data() as Message), id: doc.id });
			});
			setMessages(messages);
			console.log(messages);
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newMessage === "") return;
		await addDoc(messagesRef, {
			text: newMessage,
			createdAt: serverTimestamp(),
			user: auth.currentUser?.displayName,
			room: handymanId,
			role: "client",
		});
		setNewMessage("");
	};

	useEffect(() => {
		if (messages.length === 0) return;

		const lastMessage = messages[messages.length - 1];

		if (
			lastMessage.role === "client" &&
			lastMessage.id !== lastClientMessageId
		) {
			setLastClientMessageId(lastMessage.id); // mark as handled

			setTimeout(() => {
				addDoc(messagesRef, {
					text: "Hi, how can I help you?",
					createdAt: serverTimestamp(),
					user: handyman.name,
					room: handymanId,
					role: "handyman",
				});
			}, 1000);
		}
	}, [handymanId, lastClientMessageId, messages, messagesRef, handyman.name]);

	if (!handyman) {
		return <p>No handyman data found.</p>;
	}

	return (
		<>
			<div style={{ paddingBottom: "76px" }}>
				<div className="d-flex flex-column justify-content-between py-2 position-relative">
					<div
						className="d-flex gap-2 py-3 align-items-center position-fixed top-0 w-100 bg-white"
						style={{ zIndex: 2 }}
					>
						<IoChevronBack
							onClick={() => navigate("/chat")}
							style={{ fontSize: "20px" }}
						/>
						<p className="mb-0">{handyman.name}</p>
					</div>
					<div
						className="mt-5 pt-4 container"
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							overflowY: "auto",

							minHeight: "calc(100vh - 140px)",

							paddingBottom: "1rem",
						}}
					>
						{messages.map((message) => {
							const isClient = message.role === "client";

							return (
								<div
									key={message.id}
									className="mb-2"
									style={{
										display: "flex",
										justifyContent: isClient ? "flex-end" : "flex-start",
									}}
								>
									<span className="mb-0">{message.user}</span>
									<p
										className="p-3 py-2 mb-0 rounded"
										style={{
											backgroundColor: isClient ? "orange" : "lightgray",
											maxWidth: "100%",
											display: "inline-block",
										}}
									>
										{message.text}
									</p>
								</div>
							);
						})}
					</div>
					<form
						onSubmit={handleSubmit}
						className="position-fixed bottom-0 left-0"
					>
						<input
							type="text"
							placeholder="Type your message here"
							onChange={(e) => setNewMessage(e.target.value)}
							value={newMessage}
						/>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
			<Navbar />
		</>
	);
};

export default ChatRoom;
