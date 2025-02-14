import ProfileContainer from "../../components/profile/ProfileContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/utility/NavBar";
const Profile = () => {
	return (
        <>
        <NavBar />
        <div className='flex flex-row h-full w-full pt-20'>
                <ProfileContainer />
            </div>
        </>

	);
};
export default Profile;
