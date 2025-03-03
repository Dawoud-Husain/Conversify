import { useParams } from "react-router-dom";
import ProfileEditContainer from "../../../components/profile/ProfileEditContainer";
import NavBar from "../../../components/utility/NavBar";
import ProfileSearchBar from "../../../components/utility/ProfileSearchBar";
import useGetProfile from "../../../hooks/useGetProfile";

const EditProfile = () => {
  const { userId } = useParams();
  const { profile } = useGetProfile(userId);

  return (
    <>
      <NavBar />
      <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-[300px]">
        <ProfileSearchBar />
      </div>
      <div className="flex flex-row h-full w-full pt-20">
        <ProfileEditContainer profile={profile} />
      </div>
    </>
  );
};

export default EditProfile;
