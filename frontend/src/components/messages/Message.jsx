import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { FaReply } from "react-icons/fa6";

const Message = ({ message,  setReplyMsg }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

    const bubbleStyle = fromMe
        ? { backgroundColor: 'var(--light-yellow)', color: 'var(--darker-yellow)', borderRadius: '15px' }
        : { border: '2px solid var(--darker-yellow)', color: 'var(--darker-yellow)', backgroundColor: 'transparent', borderRadius: '15px' };

    return (
        <div className={`chat ${chatClassName} flex items-end gap-3 mb-4`}>
            {/* Profile Picture */}
            {!fromMe && (
                <div className="chat-avatar">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic}
                        className="rounded-full w-8 h-8"
                    />
                </div>
            )}

            <button onClick={() => setReplyMsg(message)} className="reply-icon">
                {fromMe && (<FaReply />)}
            </button>

            {/* Chat Bubble */}
            <div
                className="message-text chat-bubble"
                style={{
                    ...bubbleStyle,
                    maxWidth: "75%", // Allow bubbles to take up to 75% of the container width
                    wordWrap: "break-word", // Handle long text wrapping
                    padding: "10px 15px",
                }}
            >
                {message.replyMsg && (
                    <div className="reply-msg mt-2 p-2 border rounded" style={{
                        ...bubbleStyle,
                        maxWidth: "75%", // Allow bubbles to take up to 75% of the container width
                        wordWrap: "break-word", // Handle long text wrapping
                        padding: "10px 15px",
                    }}>
                        <span className="text-gray-500">{message.replyMsg.senderId === authUser._id ? "You: " : selectedConversation?.firstName + " " + selectedConversation?.lastName + ": "}</span>
                        <span className="text-gray-800 font-semibold">{message.replyMsg.message}</span>
                    </div>
                )}
                {message.message}
            </div>

            <button onClick={() => setReplyMsg(message)} className="reply-icon">
                {!fromMe && (<FaReply />)}
            </button>

            {/* Footer for Time */}
            <div className="chat-footer opacity-50 text-xs mt-1">{formattedTime}</div>

            {/* For "fromMe" messages, place the profile picture on the right */}
            {fromMe && (
                <div className="chat-avatar">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic}
                        className="rounded-full w-8 h-8"
                    />
                </div>
            )}
        </div>
    );
};

// const Message = ({ message }) => {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();
// 	const fromMe = message.senderId === authUser._id;
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
// 		</div>
// 	);
// };
export default Message;
