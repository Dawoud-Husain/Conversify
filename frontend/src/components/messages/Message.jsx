import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useReactMessages from "../../hooks/useReactMessages";
import useListenReactions from "../../hooks/useListenReactions";

const Message = ({ message }) => {
    useListenReactions();
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { reactMessage, loading } = useReactMessages();
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

            {/* Chat Bubble */}
            {!fromMe && (
            <div
                onClick={() => reactMessage(message._id, "👍")}
                className="message-text chat-bubble"
                style={{
                    ...bubbleStyle,
                    maxWidth: "75%", // Allow bubbles to take up to 75% of the container width
                    wordWrap: "break-word", // Handle long text wrapping
                    padding: "10px 15px",
                }}
            >
                {message.message}
            </div>
            )}

            {fromMe && (
            <div
                className="message-text chat-bubble"
                style={{
                    ...bubbleStyle,
                    maxWidth: "75%", // Allow bubbles to take up to 75% of the container width
                    wordWrap: "break-word", // Handle long text wrapping
                    padding: "10px 15px",
                }}
            >
                {message.message}
            </div>
            )}
            
            {message.reaction && (
                <div>
                    {message.reaction}
                </div>
            )}

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


export default Message;
