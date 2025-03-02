import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Getting all pinned contacts
const pinnedContacts = () => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const getContacts = async () => {
			try {
				const res = await fetch("/api/users/pinned");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setContacts(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
			}
		};

		getContacts();
	}, []);

	return {contacts };
};

// Pin a specific contact

export const pinContact = (contact) => {
	const pinContact = async () => {
		try {
			const res = await fetch("/api/users/pinned", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({contact}),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	pinContact();

};

// Unpin a contact

export const unPinContact = (contact) => {
	const pinContact = async () => {
		try {
			const res = await fetch("/api/users/pinned", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({contact}),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	pinContact()

};

export default pinnedContacts;