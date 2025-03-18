import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useReactMessages from "../../hooks/useReactMessages";
import useListenReactions from "../../hooks/useListenReactions";
import { FaReply } from "react-icons/fa6";
import Picker from "emoji-picker-react";
import React, { useState } from "react";

const Message = ({ message, setReplyMsg }) => {
    useListenReactions();
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { reactMessage, loading } = useReactMessages();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const [showPicker, setShowPicker] = useState(false);

    const bubbleStyle = fromMe
        ? { backgroundColor: 'var(--light-yellow)', color: 'var(--darker-yellow)', borderRadius: '15px' }
        : { border: '2px solid var(--darker-yellow)', color: 'var(--darker-yellow)', backgroundColor: 'transparent', borderRadius: '15px' };

    const onEmojiClick = async (event, emojiObject) => {
        await reactMessage(message._id, emojiObject.emoji); // Send the reaction to the backend
        setShowPicker(false); // Close the picker after selecting an emoji
    };

    return (
        <div className={`chat ${chatClassName} flex items-end gap-3 mb-4 relative`}>
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
            {!fromMe && (
                <div
                    onClick={() => setShowPicker((val) => !val)} // Toggle the picker on message click
                    className="message-text chat-bubble"
                    style={{
                        ...bubbleStyle,
                        maxWidth: "75%", // Allow bubbles to take up to 75% of the container width
                        wordWrap: "break-word", // Handle long text wrapping
                        padding: "10px 15px",
                    }}
                >
                    {message.replyMsg && (
                        <div
                            className="reply-msg mt-2 mb-2 p-2 border rounded"
                            style={{
                                backgroundColor: message.replyMsg.senderId === authUser._id ? 'var(--darker-yellow)' : 'transparent',
                                color: message.replyMsg.senderId === authUser._id ? 'var(--light-yellow)' : 'var(--darker-yellow)',
                                border: '2px solid var(--darker-yellow)',
                                borderRadius: '10px',
                                padding: '5px 10px',
                            }}
                        >
                            <span>
                                {message.replyMsg.senderId === authUser._id
                                    ? "You: "
                                    : selectedConversation?.firstName + " " + selectedConversation?.lastName + ": "}
                            </span>
                            <span>{message.replyMsg.message}</span>
                        </div>
                    )}

                    {message.message}
                </div>
            )}

            <button onClick={() => setReplyMsg(message)} className="reply-icon">
                {!fromMe && (<FaReply />)}
            </button>

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

                    {message.replyMsg && (
                        <div
                            className="reply-msg mt-2 mb-2 p-2 border rounded"
                            style={{
                                backgroundColor: message.replyMsg.senderId === authUser._id ? 'var(--darker-yellow)' : 'transparent',
                                color: message.replyMsg.senderId === authUser._id ? 'var(--light-yellow)' : 'var(--darker-yellow)',
                                border: '2px solid var(--darker-yellow)',
                                borderRadius: '10px',
                                padding: '5px 10px',
                            }}
                        >
                            <span>
                                {message.replyMsg.senderId === authUser._id
                                    ? "You: "
                                    : selectedConversation?.firstName + " " + selectedConversation?.lastName + ": "}
                            </span>
                            <span>{message.replyMsg.message}</span>
                        </div>
                    )}
                    {message.message}
                </div>
            )}

            <button onClick={() => setReplyMsg(message)} className="reply-icon">
                {!fromMe && (<FaReply />)}
            </button>

            {/* Emoji Picker */}
            {showPicker && (
                <div>
                    <Picker
                        pickerStyle={{ width: "100%" }}
                        onEmojiClick={onEmojiClick} // Close the picker when an emoji is selected
                    />
                </div>
            )}

            {/* Reaction */}
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