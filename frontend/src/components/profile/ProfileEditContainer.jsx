
import ProfileHeader from "./ProfileHeader";
import ProfileBodyEdit from "./ProfileBodyEdit";
import ProfileInfo from "./ProfileInfo";
import { useAuthContext } from "../../context/AuthContext";
import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
import { useEffect, useState } from "react";

const ProfileEditContainer = ({ profile }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [render, setRender] = useState(true);
  useEffect(() => {
    profile._id === authUser._id ? setRender(true) : setRender(false);
  }, [profile]);
  return (
    <div className="flex h-full w-full pl-10 pt-14 pr-10">
      <div className="flex-shrink-0">
        <img
          src={profile.profilePic}
          alt="Tailwind CSS chat bubble component"
          className="w-44 h-44 rounded-full object-cover"
        />
        {/* {render && <ProfilePictureUploadButton />} */}
      </div>
      <div className="flex flex-col flex-grow pt-8 pl-8 pb-8">
        <ProfileHeader profile={profile} className="mb-2" />
        <ProfileBodyEdit profile={profile} className="flex-grow" />
      </div>

      {/* Profile Info (Optional) */}
      <div className="flex-shrink-0">
        <ProfileInfo profile={profile} />
      </div>
    </div>
  );
};

export default ProfileEditContainer;
