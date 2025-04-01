

import { useState } from "react";
import { BsSend, BsClockHistory } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput = ({ replyMsg, resetReplyMsg }) => {
	const [message, setMessage] = useState("");
	const [isDisappearing, setIsDisappearing] = useState(false);
	const { loading, sendMessage } = useSendMessage();
	const { selectedConversation } = useConversation();

	//Check if the current user is blocked
	const isBlocked = selectedConversation?.blockedUsers?.includes(selectedConversation._id);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;

		if (isDisappearing) {
			const confirmSend = window.confirm("This message will disappear in 5 minutes. Send it?");
			if (!confirmSend) return;
		}

		const messageData = {
			message,
			replyMsg: replyMsg ? replyMsg._id : null,
			isDisappearing, // Include disappearing flag
		};

		await sendMessage(messageData);
		setMessage("");
		resetReplyMsg();
		setIsDisappearing(false); // Reset toggle after sending
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="relative flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg p-2.5">
				{/* Input field */}
				<input
					type="text"
					className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none"
					placeholder={isBlocked ? "You can't send messages to this user" : "Send a message"}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					disabled={isBlocked}
				/>

				{/* Disappearing Message Toggle */}
				<button
					type="button"
					className={`p-2 rounded-lg transition ${
						isDisappearing ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
					}`}
					onClick={() => setIsDisappearing(!isDisappearing)}
				>
					<BsClockHistory />
				</button>

				{/* Send Button */}
				<button
					type="submit"
					className="p-2 text-gray-600 hover:text-gray-800"
					disabled={isBlocked || loading}
				>
					{loading ? <div className="loading loading-spinner"></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
