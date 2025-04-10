import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (messageAndReply) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageAndReply),
        }
      );
      const data = await res.json();

      //Checking if the user is blocked
      if (res.status === 403) {
        toast.error(data.error || "Message not sent. You might be blocked.");
        return;
      }

      if (data.error) throw new Error(data.error);

      setMessages([
        ...messages,
        {
          ...data,
          originalMessage: data.originalMessage || messageAndReply.message, // force-set original
        },
      ]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
