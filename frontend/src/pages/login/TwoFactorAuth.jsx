import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
const TwoFactorAuth = () => {

	const [code, setCode] = useState("");
	const { setAuthUser } = useAuthContext();

	const verifyToken = (code, user) => {
		return fetch("/api/auth/verify2fa", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ code, user }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					throw new Error(data.error);
				}
				setAuthUser(data);
				window.location.href = '/'
				
				return true;
			})
			.catch((error) => {
				toast.error(error.message);
				return false;
			});
	};

	const validateCode = () => {
		if (!code || code.length !== 6) {
			toast("Please enter a valid 6 digit code.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateCode()) {
			const user = localStorage.getItem("chat-user");
			verifyToken(code, JSON.parse(user)._id);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<h1 className='text-5xl font-semibold text-center mb-4' style={{ color: 'var(--dark-yellow)', fontFamily: 'var(--logo-font)' }}>
				Conversify
			</h1>
			<form className='w-full max-w-sm' onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='code'>
						6 Digit Code
					</label>
					<input
						className='border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
						id='code'
						type='text'
						placeholder='Enter 6 digit code'
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
						style={{ fontFamily: "var(--header-font)" }}
						>
							Submit
						</button>
				</div>
			</form>
		</div>
	);
};
export default TwoFactorAuth;
