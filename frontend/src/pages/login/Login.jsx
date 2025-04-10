import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {

	useEffect(() => {
        document.body.classList.add("login-page");
        return () => {
            document.body.classList.remove("login-page"); 
        };
    }, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await login(username, password);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<h1 className='text-5xl font-semibold text-center mb-4' style={{ color: 'var(--dark-yellow)', fontFamily: 'var(--logo-font)' }}>
                Conversify
            </h1>
			<br></br>
			<div className='w-full p-6 rounded-lg shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
				 style={{ backgroundColor: "#EEEEEE" }}>	
				<h1 className='text-3xl font-semibold text-center' style={{ color: 'var(--dark-yellow)', fontFamily: 'var(--header-font)' }}>
					Login
				</h1>
				<br></br>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text' style={{ color: 'var(--darker-yellow)' }}>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10 custom-input'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text' style={{ color: 'var(--darker-yellow)' }}>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 custom-input'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline mt-2 inline-block' style={{ color: 'var(--light-grey)' }}>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 btn-hover-darken' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;

// STARTER CODE FOR THIS FILE
// const Login = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Login
// 					<span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>
// 					<a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
// 						{"Don't"} have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2'>Login</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default Login;
