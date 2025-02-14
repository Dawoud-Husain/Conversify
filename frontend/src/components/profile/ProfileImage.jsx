import { useAuthContext } from "../../context/AuthContext";
import useGetProfile from "../../hooks/useGetProfile";
import { Link } from "react-router-dom";

const ProfileImage = () => {
	const { authUser } = useAuthContext();
	const {profile} = useGetProfile(authUser._id)
	
	return (
		<div className="relative flex">
			<Link to="/profile">
				<img
					src={profile.profilePic}
					alt="Tailwind CSS chat bubble component"
					className="w-44 h-44 rounded-full object-cover"
				/>
			</Link>
		</div>
	);
};
export default ProfileImage;
