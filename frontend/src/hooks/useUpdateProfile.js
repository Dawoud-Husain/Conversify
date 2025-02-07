import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState(null);

	const updateProfile = async (profileData) => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ profileData }),
			});
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
			}
			setProfile(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, updateProfile, profile };
};

export default useUpdateProfile;
