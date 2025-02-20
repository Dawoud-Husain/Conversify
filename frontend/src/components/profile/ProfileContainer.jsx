import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileInfo from "./ProfileInfo";
import ProfileSearchBar from "../utility/ProfileSearchBar";
import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
const ProfileContainer = () => {
  return (
    <div className="flex h-full w-full pl-10 pt-14 pr-10">
      <div className="flex-shrink-0">
        <ProfileImage />
        <ProfilePictureUploadButton />
      </div>
      <div className="flex flex-col flex-grow pt-8 pl-8">
        <ProfileHeader className="mb-2" />
        <ProfileBody className="flex-grow" />
      </div>

      {/* Profile Info (Optional) */}
      <div className="flex-shrink-0">
        <ProfileInfo />
      </div>
    </div>
  );
};
export default ProfileContainer;
