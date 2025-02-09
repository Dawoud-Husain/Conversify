import ProfileContainer from "../../components/profile/ProfileContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Profile = () => {
	return (
		// <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className="flex h-screen w-screen">
            <Sidebar />
            {/* <div className="flex-grow p-4 ml-80">  */}
                {/* Main content area (MessageContainer or other content) */}
                <div className="flex-grow h-screen overflow-hidden">
                <ProfileContainer />
            </div>
            {/* </div> */}
        </div>

	);
};
export default Profile;
