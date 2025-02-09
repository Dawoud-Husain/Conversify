import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileInfo from "./ProfileInfo";

const ProfileContainer = () => {
	return (
		<div className="flex h-full w-full pl-10 pt-14 pr-10">
            {/* Left Column: Profile Image (stays at the top) */}
            <div className="flex-shrink-0">
                <ProfileImage />
            </div>

            {/* Right Column: Profile Header + Profile Body */}
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
