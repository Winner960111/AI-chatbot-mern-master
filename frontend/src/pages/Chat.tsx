import { useRef, useState } from "react";
import { motion } from "framer-motion";

import styles from "./Chat.module.css";
import ChatItem from "../components/chat/ChatItem";
import { postChatRequest } from "../../helpers/api-functions";

import sendIcon from "/logos/send-icon.png";
import noMsgBot from "/logos/no-msg2.png";

type Message = {
	role: "user" | "assistant";
	content: string;
};

const Chat = () => {
	const [chatMessages, setChatMessages] = useState<Message[]>([]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const sendMsgHandler = async () => {
		const content = inputRef.current?.value as string;

		if (inputRef.current) inputRef.current.value = "";

		const newMessage: Message = { role: "user", content };
		setChatMessages((prev) => [...prev, newMessage]);

        // send request to backend
        const chatData = await postChatRequest(content)
        setChatMessages([...chatData.chats])
	};

	const variants = {
		animate: {
			y: [0, -10, 0, -10, 0],
			transition: {
				type: "spring",
				y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
			},
		},
	};

	const placeHolder = (
		<div className={styles.no_msgs}>
			<h3>GPT 3.5 TURBO</h3>
			<motion.div
				className={styles.no_msg_logo}
				variants={variants}
				animate='animate'>
				<img alt='no msg bot' src={noMsgBot}></img>
			</motion.div>
			<p>
				It's quiet in here! Be the first to break the silence and send a message
				to get the conversation going.
			</p>
		</div>
	);

	const chats = chatMessages.map((chat) => (
		<ChatItem //@ts-ignore
			key={`${chat.content}${Math.random()}`} //@ts-ignore
			content={chat.content} //@ts-ignore
			role={chat.role}
		/>
	));

	return (
		<div className={styles.parent}>
			<div className={styles.chat}>
				{chatMessages.length === 0 ? placeHolder : chats}
			</div>
			<div className={styles.inputContainer}>
				<div>
					<input type='text' maxLength={1500} ref={inputRef} />
					<button className={styles.icon} onClick={sendMsgHandler}>
						<img alt='icon' src={sendIcon} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
