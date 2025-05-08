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
import { useParams } from "react-router-dom";
import { Role } from "../../../types/types";

type Message = {
	text: string;
	id: string;
	createdAt: Timestamp;
	user: string;
	room: string;
	role: Role;
};

const ChatRoom = () => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [lastClientMessageId, setLastClientMessageId] = useState<string | null>(
		null
	);

	const messagesRef = collection(db, "messages");

	const { handymanId } = useParams();

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
					user: "Handyman Klaus",
					room: handymanId,
					role: "handyman",
				});
			}, 1000);
		}
	}, [handymanId, lastClientMessageId, messages, messagesRef]);

	return (
		<div>
			<div>
				{messages.map((message) => {
					const isClient = message.role === "client";

					return (
						<div key={message.id}>
							<span>{message.user}</span>
							<p style={{ backgroundColor: isClient ? "orange" : "lightgray" }}>
								{message.text}
							</p>
						</div>
					);
				})}
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Type your message here"
					onChange={(e) => setNewMessage(e.target.value)}
					value={newMessage}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default ChatRoom;
