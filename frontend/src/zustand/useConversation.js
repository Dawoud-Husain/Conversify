import { create } from "zustand";
import produce from "immer";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    editMessage: (updatedMessage) => 
        set(produce((state) => {
            const messageIndex = state.messages.findIndex((msg) => msg._id === updatedMessage._id);
            if (messageIndex !== -1) {
                state.messages[messageIndex].reaction = updatedMessage.reaction;
            }
        })),
}));

export default useConversation;