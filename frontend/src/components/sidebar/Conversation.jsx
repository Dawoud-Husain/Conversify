import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

import { useState, useEffect } from "react";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const [contextMenu, setContextMenu] = useState(null);
	const [isPinned, setIsPinned] = useState(false);

	const isSelected = selectedConversation?._id === conversation._id;
	const isOnline = onlineUsers.includes(conversation._id);

	// Creating the context menu on right click
	const handleRightClick = (e) => {
		e.preventDefault();
		// Get the position of the conversation component
		const rect = e.currentTarget.getBoundingClientRect(); 
		setContextMenu({
			// Pop up right beside the conversation
			mouseX: rect.right,
			mouseY: rect.top,
		});
	};

	// For closing the contextMenu if one is already open
	const handleClick = () => {
		if (contextMenu) {
			setContextMenu(null);
		}
	};

	// Handling changes of context menu availability
	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [contextMenu]);

	const handlePinClick = () => {
		setIsPinned(!isPinned);
		setContextMenu(null);
	};

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
				onContextMenu={handleRightClick}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{`${conversation.firstName} ${conversation.lastName}`}</p>
						{/* <span className='text-xl'>{emoji}</span> */}
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}

			{/* Only render the context menu on right click */}
			{contextMenu && (
				<ul
					className="context-menu"
					style={{
						top: contextMenu.mouseY,
						left: contextMenu.mouseX,
						position: "absolute",
						backgroundColor: "white",
						boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
						padding: "10px",
						borderRadius: "5px",
						zIndex: 1000,
						cursor: "pointer",
					}}
				>
					<li
						className="context-menu-item"
						onClick={handlePinClick}
					>
						{isPinned ? "📌 Unpin" : "📌 Pin"}
					</li>
				</ul>
			)}
		</>
	);
};
export default Conversation;
