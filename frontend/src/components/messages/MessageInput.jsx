import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput = ({ replyMsg, resetReplyMsg }) => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
    // const { selectedConversation } = useConversation();
	// const { authUser } = useAuthContext();

	// const replyFromMe = replyMsg.senderId === authUser._id;
	// const replyFromMe = authUser._id === authUser._id;
	// const replyName = replyFromMe ? selectedConversation?.firstName + " " + selectedConversation?.lastName : "You";

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;

		const messageAndReply = {
            message,
            replyMsg: replyMsg ? replyMsg._id : null, // Include replyMsg if it exists
        };

		// replyMsg = replyMsg ? replyMsg : null;

		console.log(messageAndReply);
		await sendMessage(messageAndReply);
		setMessage("");
		resetReplyMsg();
	};

	return (
        <form onSubmit={handleSubmit}>
            <div className="w-full relative">
				{/* {replyMsg && (
					<div className='bg-gray-100 p-3 rounded-lg mb-3'>
						<div className='flex flex-col gap-2'>
							<span className='text-gray-500'>{replyMsg.senderId === authUser._id ? "You" : selectedConversation?.firstName + " " + selectedConversation?.lastName}</span>
							<span className='text-gray-800 font-semibold'>{replyMsg.message}</span>
						</div>
					</div>
				)} */}
				<div className='w-full relative'>
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-300 text-gray-700 placeholder-gray-500"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-600 hover:text-gray-800"
                >
                    {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
                </button>
				</div>
            </div>
        </form>
    );
};
export default MessageInput;