import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenReactions = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, editMessage } = useConversation();

    useEffect(() => {
        socket?.on("newReaction", (updatedMessage) => {
            editMessage(updatedMessage);
        });

        return () => socket?.off("newReaction");
    }, [socket, setMessages, editMessage]);
};

export default useListenReactions;