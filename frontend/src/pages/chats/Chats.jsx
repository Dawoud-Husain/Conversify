import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Chats = () => {

	return (
		// <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-4 ml-80"> 
                {/* Main content area (MessageContainer or other content) */}
                <MessageContainer />
            </div>
        </div>

	);
};

// 	return (
// 		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 			<Sidebar />
// 			<MessageContainer />
// 		</div>
// 	);
// };
export default Chats;
