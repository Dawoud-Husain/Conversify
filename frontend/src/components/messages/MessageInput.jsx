// import { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
// 	const [message, setMessage] = useState("");
// 	const { loading, sendMessage } = useSendMessage();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!message) return;
// 		await sendMessage(message);
// 		setMessage("");
// 	};

// 	return (
//         <form onSubmit={handleSubmit}>
//             <div className="w-full relative">
//                 <input
//                     type="text"
//                     className="border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-300 text-gray-700 placeholder-gray-500"
//                     placeholder="Send a message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     type="submit"
//                     className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-600 hover:text-gray-800"
//                 >
//                     {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
//                 </button>
//             </div>
//         </form>
//     );


	// return (
	// 	<form className='px-4 my-3' onSubmit={handleSubmit}>
	// 		<div className='w-full relative'>
	// 			<input
	// 				type='text'
	// 				className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
	// 				placeholder='Send a message'
	// 				value={message}
	// 				onChange={(e) => setMessage(e.target.value)}
	// 			/>
	// 			<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
	// 				{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
	// 			</button>
	// 		</div>
	// 	</form>
	// );
//};
//export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;


import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const { selectedConversation } = useConversation();

	//Check if the current user is blocked
	const isBlocked = selectedConversation?.blockedUsers?.includes(selectedConversation._id);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
        <form onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-300 text-gray-700 placeholder-gray-500"
                    placeholder={isBlocked ? "You can't send messages to this user" : "Send a message"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isBlocked} 
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-600 hover:text-gray-800"
                    disabled={isBlocked || loading} 
                >
                    {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
