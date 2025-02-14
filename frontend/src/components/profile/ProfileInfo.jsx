import { useAuthContext } from "../../context/AuthContext";
import { BiEnvelope, BiHome, BiPhone } from "react-icons/bi"; // Importing icons

const ProfileInfo = () => {
  const { authUser } = useAuthContext();
  const userEmail = authUser.email;
  const phoneNumber = authUser.phoneNumber;

  return (
    <div className="relative flex flex-col gap-2 text-gray-700">
      {/* Address Section */}
      {/* <div className="flex items-center gap-2">
                <BiHome className="w-8 h-8" style={{ color: 'var(--dark-yellow)' }} />
                <span>Georgia Bay, ON Canada, A1B 2C3</span>
            </div> */}

      {/*Phone section*/}
      <div className="flex items-center gap-2">
        <BiPhone className="w-8 h-8" style={{ color: "var(--dark-yellow)" }} />
        <span>{`+1 ${phoneNumber}`}</span>
      </div>
      <br></br>

      {/* Email Section */}
      <div className="flex items-center gap-2">
        <BiEnvelope
          className="w-7 h-7"
          style={{ color: "var(--dark-yellow)" }}
        />
        <a href={`mailto:${userEmail}`} className="hover:underline">
          {userEmail}
        </a>
      </div>
    </div>
  );
};
export default ProfileInfo;
