import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Getting all friends
export const getFriendNotifications = () => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const getNotifications = async () => {
			try {
				const res = await fetch(`/api/users/friendNotifications`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setNotifications(data);
			} catch (error) {
				toast.error(error.message);
			}
		};

		getNotifications();
	}, []);

	return { notifications };
};
// Deleting a friend from notifications
export const deleteFriendNotifications = async (id) => {
	if (!id) {
		return;
	}
	try {
		const res = await fetch(`/api/users/friendNotifications/${id}`, {
			method: 'DELETE'
		});
		const data = await res.json();
		if (data.error) {
			throw new Error(data.error);
		}
	} catch (error) {
		toast.error(error.message);
	}
};
