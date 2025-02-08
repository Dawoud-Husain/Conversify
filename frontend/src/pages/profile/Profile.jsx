import MessageContainer from "../../components/messages/MessageContainer";
import Navbar from "../../components/navbar/Navbar";

const Profile = () => {
	return (
		// <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className="flex">
            <Navbar />
            <div className="flex-grow p-4 ml-80"> 
                {/* Main content area (MessageContainer or other content) */}
                <MessageContainer />
            </div>
        </div>

	);
};
export default Profile;
