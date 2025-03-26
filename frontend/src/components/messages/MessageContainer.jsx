import { useEffect,useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [replyMsg, setReplyMsg] = useState(null);

	const { authUser } = useAuthContext();

	useEffect(() => {
        // Reset replyMsg when selectedConversation changes
        setReplyMsg(null);
    }, [selectedConversation]);

    useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
        <div className="flex flex-col h-full w-full">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className="bg-gray-200 px-4 py-2 mb-2 flex items-center justify-between shadow-sm">
                        <span className="text-gray-700 text-sm font-semibold">
                            To: {selectedConversation.firstName + ' ' + selectedConversation.lastName || "Unknown User"}
                        </span>
                        <span className="text-gray-500 text-xs">
                            {selectedConversation?.isOnline ? "Online" : "Offline"}
                        </span>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto">
						<Messages setReplyMsg={setReplyMsg}/>
                    </div>

                    {/* Input */}
                    <div className="bg-gray-200 mt-2 px-4 py-3">
					{replyMsg && (
							<div className='bg-gray-100 p-3 rounded-lg mb-3 relative'>
								<button onClick={() => setReplyMsg(null)} className="absolute top-0 right-0 mt-3 mr-3">
								<AiOutlineClose className="text-xl text-gray-700 hover:text-gray-900" />
								</button>
								<div className='flex flex-col gap-2'>
									<span className='text-gray-500'>{replyMsg.senderId === authUser._id ? "You" : selectedConversation?.firstName + " " + selectedConversation?.lastName}</span>
									<span className='text-gray-800 font-semibold'>{replyMsg.message}</span>
								</div>
							</div>
						)}
                        <MessageInput replyMsg={replyMsg} resetReplyMsg={() => setReplyMsg(null)}/>
                    </div>
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.firstName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
