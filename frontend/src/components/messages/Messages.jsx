import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { extractTime } from "../../utils/extractTime";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { useAuthContext } from "../../context/AuthContext";

const lastMessageSentByUser = (messages, id) => {
	if (!messages || messages.length === 0) return null;
	return [...messages].findLast((message) => message.senderId === id);
};

const Messages = () => {
	const { authUser } = useAuthContext();
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();
	const lastMessage = lastMessageSentByUser(messages, authUser?._id);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} lastMessage={lastMessage?._id === message._id || false} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;
