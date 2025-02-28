import toast from "react-hot-toast";
import { useState } from "react";

const useDeleteConversations = () => {
    const [loading, setLoading] = useState(false);

    const deleteConversation = async (otherUserId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/conversations/${otherUserId}`, {
              method: "DELETE",
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteConversation };
};

export default useDeleteConversations;