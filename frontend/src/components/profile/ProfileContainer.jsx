import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileInfo from "./ProfileInfo";
import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";

const ProfileContainer = ({ profile }) => {
  return (
    <div className="flex h-full w-full pl-10 pt-14 pr-10">
      <div className="flex-shrink-0">
        <img
          src={profile.profilePic}
          alt="Tailwind CSS chat bubble component"
          className="w-44 h-44 rounded-full object-cover"
        />
        <ProfilePictureUploadButton profile={profile} />
      </div>
      <div className="flex flex-col flex-grow pt-8 pl-8">
        <ProfileHeader profile={profile} className="mb-2" />
        <ProfileBody profile={profile} className="flex-grow" />
      </div>

      {/* Profile Info (Optional) */}
      <div className="flex-shrink-0">
        <ProfileInfo profile={profile} />
      </div>
    </div>
  );
};

export default ProfileContainer;
