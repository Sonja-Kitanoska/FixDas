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
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Handyman, Role } from "../../../types/types";
import Navbar from "../../../components/Navbar/Navbar";
import { IoChevronBack } from "react-icons/io5";
import styles from "./ChatRoom.module.css";
import { VscSmiley } from "react-icons/vsc";
import { LuSendHorizontal } from "react-icons/lu";
import { MdVerified } from "react-icons/md";

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
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const { id } = useParams();

	const handyman: Handyman = location.state?.handyman;

	useEffect(() => {
		const queryMessages = query(
			messagesRef,
			where("room", "==", id),
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
			room: id,
			role: "client",
		});
		setNewMessage("");
	};

	useEffect(() => {
		if (!handyman || messages.length === 0) return;

		const lastMessage = messages[messages.length - 1];

		if (
			lastMessage.role === "client" &&
			lastMessage.id !== lastClientMessageId
		) {
			setLastClientMessageId(lastMessage.id);

			setTimeout(() => {
				addDoc(messagesRef, {
					text: "Hi, how can I help you?",
					createdAt: serverTimestamp(),
					user: handyman.name,
					room: id,
					role: "handyman",
				});
			}, 1000);
		}
	}, [id, lastClientMessageId, messages, messagesRef, handyman]);

	if (!handyman) {
		return <p>No handyman data found.</p>;
	}

	return (
		<>
			<div
				style={{
					paddingBottom: "80px",
					minHeight: "100vh",
				}}
			>
				<div className="position-relative">
					<div className="d-flex gap-3 py-3 align-items-center w-100 bg-white position-fixed top-0">
						<IoChevronBack
							onClick={() => navigate("/chat")}
							style={{ fontSize: "20px" }}
						/>
						<div className="d-flex gap-2 align-items-center">
							<div style={{ width: "30px", height: "30px" }}>
								<img
									src="https://picsum.photos/200/300?random=1"
									alt="handyman-image"
									className="w-100 h-100 object-fit-cover rounded-circle"
								/>
							</div>
							<p className="mb-0">{handyman.name}</p>
							<MdVerified color="#1461F0" />
						</div>
					</div>

					<div
						className="pt-4 container"
						style={{
							maxHeight: "calc(100vh-300px)",
							overflowY: "scroll",
							marginTop: "62px",
							marginBottom: "120px",
						}}
					>
						{messages.map((message) => {
							const isClient = message.role === "client";

							return (
								<div
									key={message.id}
									className="mb-4"
									style={{
										display: "flex",
										justifyContent: isClient ? "flex-end" : "flex-start",
									}}
								>
									<p className="mb-0 p-3 py-2">{!isClient && message.user}</p>
									<p
										className="p-3 py-2 mb-0 rounded font-weight-400"
										style={{
											backgroundColor: isClient ? "#FB8133" : "#F0F0F0",
											color: isClient ? "white" : "",
											maxWidth: "100%",
											display: "inline-block",
											wordBreak: "break-word",
											overflowWrap: "break-word",
										}}
									>
										{message.text}
									</p>
								</div>
							);
						})}
					</div>
					<div ref={messagesEndRef}></div>
					<form
						onSubmit={handleSubmit}
						style={{ position: "fixed", bottom: "85px", width: "100%" }}
					>
						<div className={styles.textareaWrapper}>
							{<VscSmiley className={styles.icon} />}
							<div className="container">
								<textarea
									placeholder="Your message"
									onChange={(e) => setNewMessage(e.target.value)}
									value={newMessage}
									rows={1}
									className={`form-control input-field ${styles.textareaField}`}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											e.currentTarget.form?.requestSubmit();
										}
									}}
								/>
							</div>
							<button
								className={`${styles.sendIcon} border-0 bg-transparent`}
								type="submit"
							>
								{<LuSendHorizontal />}
							</button>
						</div>
					</form>
				</div>
				{messages.length === 0 && (
					<div className="d-flex flex-column text-center container">
						<div>
							<img src="./Illustration.png" alt="Ilustration" />
						</div>
						<h1 style={{ fontSize: "20px" }}>Gespräch beginnen</h1>
						<p className="font-size-14">
							Lorem ipsum dolor sit amet consectetur. Elit eget donec ipsum a
							bibendum fermentum velit.
						</p>
					</div>
				)}
			</div>

			<Navbar />
		</>
	);
};

export default ChatRoom;
