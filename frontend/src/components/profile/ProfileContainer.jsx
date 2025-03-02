import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileInfo from "./ProfileInfo";
import ProfileFriends from "./ProfileFriends"; // Import ProfileFriends
import { addFriend } from "../../hooks/useGetFriends";
import { getFriends } from "../../hooks/useGetFriends";
import { useAuthContext } from "../../context/AuthContext";
import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Import toast for notifications

const ProfileContainer = ({ profile }) => {
  const { authUser } = useAuthContext();
  const [render, setRender] = useState(true);
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const { contacts, setContacts } = getFriends(authUser._id);
  const [areFriends, setAreFriends] = useState(false);

  // Check whether the profile that is being visited is a friend or not
  useEffect(() => {
    setAreFriends(contacts.some(contact => contact._id === profile._id));
  }, [contacts, profile._id]);

  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  // Check whether the profile being visited is the authenticated user's profile
  useEffect(() => {
    profile._id === authUser._id ? setRender(true) : setRender(false);
  }, [profile]);

  // On button click 
  const handleAddFriend = async () => {
    setIsLoading();
    try {
      await addFriend(profile._id);
      toast.success("Friend added!");
      setIsFriendRequestSent(true);
      setAreFriends(true);
      window.location.reload(); // Refresh page so the effect takes place
    } catch (error) {
      toast.error("Failed to add friend.");true
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-full w-full p-10">
      <div className="">
        <div className="flex flex-row">
          <div>
            <img
              src={profile.profilePic}
              alt="Tailwind CSS chat bubble component"
              className="w-44 h-44 rounded-full object-cover"
            />
          </div>
          <div className="ml-4 mt-8">
            <ProfileHeader profile={profile} />
          </div>
        </div>
        {!render && !isLoading && (
          <div className="mt-4">
            <button
              onClick={handleAddFriend}
              className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
              style={{ fontFamily: "var(--header-font)" }}
              disabled={areFriends}
            >
              {areFriends ? "Friends!" : "Add Friend"}
            </button>
          </div>
        )}
        {render && <ProfilePictureUploadButton />}
      </div>
      <div className="flex justify-end col-span-2">
        <ProfileInfo profile={profile} />
      </div>
      <div className="">
        <ProfileFriends profile={profile} />
      </div>
    </div>
  );
};

export default ProfileContainer;
