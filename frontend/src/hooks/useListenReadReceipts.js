import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenReadReceipts = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, readReceipt } = useConversation();

    useEffect(() => {
        socket?.on("readReceipt", (updatedMessage) => {
            readReceipt(updatedMessage);
        });

        return () => socket?.off("readReceipt");
    }, [socket, setMessages, readReceipt]);
};

export default useListenReadReceipts;