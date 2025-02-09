import { useAuthContext } from "../../context/AuthContext";

const ProfileImage = () => {
	const { authUser } = useAuthContext();
    const profilePic = authUser.profilePic;
    
    return (
		<div className="relative flex">
			<img
				src={profilePic}
				alt="Tailwind CSS chat bubble component"
				className="w-44 h-44 rounded-full object-cover"
			/>
		</div>
	);
};
export default ProfileImage;
