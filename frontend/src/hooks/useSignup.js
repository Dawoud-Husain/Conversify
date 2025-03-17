import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ firstName, lastName, username, email, phoneNumber, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ firstName, lastName, email, phoneNumber, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ firstName, lastName, email, phoneNumber, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ firstName, lastName, email, phoneNumber, username, password, confirmPassword, gender }) {
	if (!firstName || !email || !phoneNumber || !lastName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		toast.error("Invalid email format");
		return false;
	}

	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(phoneNumber)) {
		toast.error("Phone number must be 10 digits");
		return false;
	}

	if (username.length < 3) {
		toast.error("Username must be at least 3 characters");
		return false;
	}

	return true;
}
