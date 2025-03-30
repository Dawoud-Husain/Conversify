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
import { useAuthContext } from "../../context/AuthContext";

const Messages = ({ setReplyMsg }) => {
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext();
  useListenMessages();

  const lastMessageRef = useRef();
  const lastMessage = lastMessageSentByUser(messages, authUser?._id);

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
          const isSender = message.senderId === authUser?._id;

          const displayedText = isSender
            ? message.originalMessage || message.message
            : message.message;

          const enrichedMessage = {
            ...message,
            displayedText,
          };
          <div key={message._id} ref={lastMessageRef}>
            <Message
              message={enrichedMessage}
              lastMessage={lastMessage?._id === message._id || false}
              setReplyMsg={setReplyMsg}
            />
          </div>;
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
