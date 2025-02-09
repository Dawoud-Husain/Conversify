import { useAuthContext } from "../../context/AuthContext";
import { BiEnvelope, BiHome } from "react-icons/bi"; // Importing icons

const ProfileInfo = () => {
    const { authUser } = useAuthContext();
    const profilePic = authUser.profilePic;
    
    return (
        <div className="relative flex flex-col gap-2 text-gray-700">
            {/* Address Section */}
            <div className="flex items-center gap-2">
                <BiHome className="w-8 h-8" style={{ color: 'var(--dark-yellow)' }} /> {/* Address Icon */}
                <span>Georgia Bay, ON Canada, A1B 2C3</span>
            </div>
            <br></br>
            {/* Email Section */}
            <div className="flex items-center gap-2">
                <BiEnvelope className="w-7 h-7" style={{ color: 'var(--dark-yellow)' }} /> {/* Email Icon */}
                <a href={'mailto:johndoe@hotmail.com'} className="hover:underline">
                johndoe@hotmail.com
                </a>
            </div>
        </div>
    );
};
export default ProfileInfo;
