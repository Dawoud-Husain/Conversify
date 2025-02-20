import ProfileContainer from "../../components/profile/ProfileContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/utility/NavBar";
import ProfileSearchBar from "../../components/utility/ProfileSearchBar";
const Profile = () => {
  return (
    <>
      <NavBar />
      <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-[300px]">
        <ProfileSearchBar />
      </div>
      <div className="flex flex-row h-full w-full pt-20">
        <ProfileContainer />
      </div>
    </>
  );
};
export default Profile;
