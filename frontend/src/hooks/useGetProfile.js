import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetProfile = () => {
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState([]);

	useEffect(() => {
		const getProfile = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/profile");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setProfile(data);
				console.log(data)
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getProfile();
	}, []);

	return { loading, profile };
};
export default useGetProfile;
