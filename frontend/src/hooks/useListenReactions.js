import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenReactions = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newReaction", (updatedMessage) => {
            setMessages(prevMessages => 
                prevMessages.map(msg => 
                    msg._id === updatedMessage._id 
                        ? { ...msg, reaction: updatedMessage.reaction } 
                        : msg
                )
            );
        });

        return () => socket?.off("newReaction");
    }, [socket, setMessages]);
};

export default useListenReactions;