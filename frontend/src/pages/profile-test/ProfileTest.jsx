import { useAuthContext } from "../../context/AuthContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const ProfileTest = () => {
  const { authUser, setAuthUser } = useAuthContext();

  return (
    <div>
      <h1>Welcome, {authUser ? authUser.fullName : "Guest"}</h1>
    </div>
  );
};

export default ProfileTest;
