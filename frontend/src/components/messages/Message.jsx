import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useReactMessages from "../../hooks/useReactMessages";
import useListenReactions from "../../hooks/useListenReactions";
import useListenReadReceipts from "../../hooks/useListenReadReceipts";
import { FaReply } from "react-icons/fa6";
import Picker from "emoji-picker-react";
// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

const Message = ({ message, lastMessage, setReplyMsg }) => {
    useListenReactions();
    useListenReadReceipts();
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { reactMessage, loading } = useReactMessages();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const [showPicker, setShowPicker] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    // Disappearing message styles
	const disappearingStyle = {
		border: "2px dashed red",
		backgroundColor: "#ffeeee",
		color: "red",
		position: "relative",
	};

    // const bubbleStyle = fromMe
    //     ? { backgroundColor: 'var(--light-yellow)', color: 'var(--darker-yellow)', borderRadius: '15px' }
    //     : { border: '2px solid var(--darker-yellow)', color: 'var(--darker-yellow)', backgroundColor: 'transparent', borderRadius: '15px' };

    const regularStyle = {
		backgroundColor: fromMe ? "var(--light-yellow)" : "transparent",
		color: "var(--darker-yellow)",
		borderRadius: "15px",
		border: fromMe ? "none" : "2px solid var(--darker-yellow)",
	};

	// Handle disappearing message countdown
	useEffect(() => {
		if (message.isDisappearing) {
			const expiryTime = new Date(message.disappearAt).getTime();
			const interval = setInterval(() => {
				const now = new Date().getTime();
				const remainingTime = Math.max(0, Math.floor((expiryTime - now) / 1000));
				setTimeLeft(remainingTime);

				if (remainingTime === 0) clearInterval(interval);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [message.isDisappearing, message.disappearAt]);

  const onEmojiClick = async (event, emojiObject) => {
    await reactMessage(message._id, emojiObject.emoji);
    setShowPicker(false);
  };

  const getReplyText = (replyMsg) => {
    if (!replyMsg || !replyMsg.senderId) return "";
    const isSender = replyMsg.senderId === authUser._id;
    return isSender
      ? replyMsg.originalMessage || replyMsg.message
      : replyMsg.message;
  };

  return (
    <div className={`chat ${chatClassName} flex items-end gap-3 mb-4 relative`}>
      {/* Profile Picture */}
      {!fromMe && (
        <div className="chat-avatar">
          <img
            alt="User avatar"
            src={profilePic}
            className="rounded-full w-8 h-8"
          />
        </div>
      )}

      <button onClick={() => setReplyMsg(message)} className="reply-icon">
        {fromMe && <FaReply />}
      </button>

      {/* Chat Bubble */}
      {(fromMe || !fromMe) && (
        <div
          onClick={() => setShowPicker((val) => !val)}
          className="message-text chat-bubble"
          style={{
            // ...bubbleStyle,
                        ...(message.isDisappearing ? disappearingStyle : regularStyle),
            maxWidth: "75%",
            wordWrap: "break-word",
            padding: "10px 15px",
          }}
        >
          {message.replyMsg && (
            <div
              className="reply-msg mt-2 mb-2 p-2 border rounded"
              style={{
                backgroundColor:
                  message.replyMsg.senderId === authUser._id
                    ? "var(--darker-yellow)"
                    : "transparent",
                color:
                  message.replyMsg.senderId === authUser._id
                    ? "var(--light-yellow)"
                    : "var(--darker-yellow)",
                border: "2px solid var(--darker-yellow)",
                borderRadius: "10px",
                padding: "5px 10px",
              }}
            >
              <span>
                {message.replyMsg.senderId === authUser._id
                  ? "You: "
                  : selectedConversation?.firstName +
                    " " +
                    selectedConversation?.lastName +
                    ": "}
              </span>
              <span>{getReplyText(message.replyMsg)}</span>
            </div>
          )}
                    
            {message.isDisappearing && timeLeft > 0 && (
                <div className="text-xs font-semibold absolute top-0 right-2 text-red-600">
                    ⏳ {timeLeft}s
                </div>
            )}
          {message.displayedText}
        </div>
      )}

      <button onClick={() => setReplyMsg(message)} className="reply-icon">
        {!fromMe && <FaReply />}
      </button>

      {/* Emoji Picker */}
      {showPicker && (
        <div>
          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* Reaction */}
      {message.reaction && <div>{message.reaction}</div>}

      {/* Footer for Time */}
      <div className="chat-footer opacity-50 text-xs mt-1">
        {lastMessage && message.timeRead
          ? `Read at ${extractTime(message.timeRead)}`
          : formattedTime}
      </div>
      {/* Footer */}
      {/* <div className="chat-footer opacity-50 text-xs mt-1">{formattedTime}</div> */}

      {/* Sender Profile Pic */}
      {fromMe && (
        <div className="chat-avatar">
          <img
            alt="User avatar"
            src={profilePic}
            className="rounded-full w-8 h-8"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
