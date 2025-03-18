import { useState } from "react";
import toast from "react-hot-toast";

const useBlockUser = () => {
  const [loading, setLoading] = useState(false);

  const blockUser = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/block/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success("User blocked successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const unblockUser = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/unblock/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success("User unblocked successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, blockUser, unblockUser };
};

export default useBlockUser;
