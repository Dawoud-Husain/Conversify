import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { useAuthContext } from "../../context/AuthContext";

const Messages = ({ setReplyMsg }) => {
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => {
          console.log("🧠 message._id:", message._id);
          console.log(
            "👤 senderId vs authUserId:",
            message.senderId,
            authUser?._id
          );
          console.log("📝 message.message (translated):", message.message);
          console.log(
            "✉️ message.originalMessage (raw):",
            message.originalMessage
          );

          const isSender = message.senderId === authUser?._id;

          const displayedText = isSender
            ? message.originalMessage || message.message
            : message.message;

          console.log("✅ Final displayedText:", displayedText);

          const enrichedMessage = {
            ...message,
            displayedText,
          };

          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={enrichedMessage} setReplyMsg={setReplyMsg} />
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
