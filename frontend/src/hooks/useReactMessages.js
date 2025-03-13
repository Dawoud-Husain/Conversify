import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useReactMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useConversation();

    const reactMessage = async (messageId, reaction) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/react/${messageId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reaction_emoji: reaction }),
            });
            
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Update local state
            const updatedMessages = messages.map(msg => 
                msg._id === messageId ? {...msg, reaction: data.reaction} : msg
            );
            setMessages(updatedMessages);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { reactMessage, loading };
};
export default useReactMessages;