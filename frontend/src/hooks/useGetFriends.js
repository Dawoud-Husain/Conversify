import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Getting all friends
export const getFriends = (id) => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		if (!id) {
			return;
		}

		const getFriends = async (id) => {
			try {
				const res = await fetch(`/api/users/friends/${id}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				console.log(data)
				setContacts(data);
			} catch (error) {
				toast.error(error.message);
			}
		};

		getFriends(id);
	}, [id]);

	return { contacts };
};

// adding a friend
export const addFriend = (id) => {
	const addFriend = async () => {
		try {
			const res = await fetch("/api/users/friends", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({id}),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	addFriend();

};