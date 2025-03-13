// import ProfileImage from "./ProfileImage";
// import ProfileHeader from "./ProfileHeader";
// import ProfileBody from "./ProfileBody";
// import ProfileInfo from "./ProfileInfo";
// import ProfileFriends from "./ProfileFriends"; // Import ProfileFriends
// import { addFriend } from "../../hooks/useGetFriends";
// import { getFriends } from "../../hooks/useGetFriends";
// import { useAuthContext } from "../../context/AuthContext";
// import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const ProfileContainer = ({ profile }) => {
//   const navigate = useNavigate();
//   const { authUser, setAuthUser } = useAuthContext();
//   const [render, setRender] = useState(true);
//   const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
//   const { contacts, setContacts } = getFriends(authUser._id);
//   const [areFriends, setAreFriends] = useState(false);

//   // Check whether the profile that is being visited is a friend or not
//   useEffect(() => {
//     setAreFriends(contacts.some(contact => contact._id === profile._id));
//   }, [contacts, profile._id]);

//   const [isLoading, setIsLoading] = useState(false); // Loading state for the button

//   // Check whether the profile being visited is the authenticated user's profile
//   useEffect(() => {
//     profile._id === authUser._id ? setRender(true) : setRender(false);
//   }, [profile]);

//   // On button click 
//   const handleAddFriend = async () => {
//     setIsLoading();
//     try {
//       await addFriend(profile._id);
//       toast.success("Friend added!");
//       setIsFriendRequestSent(true);
//       setAreFriends(true);
//       window.location.reload(); // Refresh page so the effect takes place
//     } catch (error) {
//       toast.error("Failed to add friend.");true
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-3 gap-4 h-full w-full p-10">
//       <div className="">
//         <div className="flex flex-row">
//           <div>
//             <img
//               src={profile.profilePic}
//               alt="Tailwind CSS chat bubble component"
//               className="w-44 h-44 rounded-full object-cover"
//             />
//           </div>
//           <div className="ml-4 mt-8">
//             <ProfileHeader profile={profile} />
//           </div>
//         </div>
//         {!render && !isLoading && (
//           <div className="mt-4">
//             <button
//               onClick={handleAddFriend}
//               className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
//               style={{ fontFamily: "var(--header-font)" }}
//               disabled={areFriends}
//             >
//               {areFriends ? "Friends!" : "Add Friend"}
//             </button>
//           </div>
//         )}
//         {render && <ProfilePictureUploadButton />}
//         {render && (
//           <button
//             onClick={() => navigate("/profile/edit/" + authUser._id)}
//             className="btn mt-2 w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
//             style={{ fontFamily: "var(--header-font)" }}
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>
//       <div className="flex justify-end col-span-2">
//         <ProfileInfo profile={profile} />
//       </div>
//       <div className="">
//         <ProfileBody profile={profile} />
//       </div>

//       <div className="">
//         <ProfileFriends profile={profile} />
//       </div>
      
//     </div>
//   );
// };

// export default ProfileContainer;



import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileInfo from "./ProfileInfo";
import ProfileFriends from "./ProfileFriends";
import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
import { addFriend } from "../../hooks/useGetFriends";
import { getFriends } from "../../hooks/useGetFriends";
import { useAuthContext } from "../../context/AuthContext";
import useBlockUser from "../../hooks/useBlockUser"; 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileContainer = ({ profile }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const { loading, blockUser, unblockUser } = useBlockUser();
  const [render, setRender] = useState(true);
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const { contacts, setContacts } = getFriends(authUser._id);
  const [areFriends, setAreFriends] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); 

  //Fetch latest blocked status from the backend
  useEffect(() => {
    const fetchBlockedStatus = async () => {
      try {
        const res = await fetch(`/api/users/profile/${authUser._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setIsBlocked(data.blockedUsers?.includes(profile._id));
      } catch (error) {
        console.error("Error fetching blocked status:", error);
      }
    };

    fetchBlockedStatus();
  }, [profile._id, authUser]);

  useEffect(() => {
    setAreFriends(contacts.some(contact => contact._id === profile._id));
  }, [contacts, profile._id]);

  useEffect(() => {
    profile._id === authUser._id ? setRender(true) : setRender(false);
  }, [profile]);

  const handleAddFriend = async () => {
    try {
      await addFriend(profile._id);
      toast.success("Friend added!");
      setIsFriendRequestSent(true);
      setAreFriends(true);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to add friend.");
    }
  };

  //Handle block/unblock toggle and refresh state
  const handleBlockToggle = async () => {
    if (isBlocked) {
      await unblockUser(profile._id);
      setIsBlocked(false);
    } else {
      await blockUser(profile._id);
      setIsBlocked(true);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-full w-full p-10">
      <div className="">
        <div className="flex flex-row">
          <div>
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover"
            />
          </div>
          <div className="ml-4 mt-8">
            <ProfileHeader profile={profile} />
          </div>
        </div>

        {!render && (
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
        {render && (
          <button
            onClick={() => navigate("/profile/edit/" + authUser._id)}
            className="btn mt-2 w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
            style={{ fontFamily: "var(--header-font)" }}
          >
            Edit Profile
          </button>
        )}

        {/*Block/Unblock Button */}
        {!render && (
          <button
            onClick={handleBlockToggle}
            disabled={loading}
            className={`btn w-44 h-8 px-8 font-semibold rounded-full mt-4 ${
              isBlocked ? "bg-red-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {loading ? "Processing..." : isBlocked ? "Unblock User" : "Block User"}
          </button>
        )}
      </div>

      <div className="flex justify-end col-span-2">
        <ProfileInfo profile={profile} />
      </div>

      <div className="">
        <ProfileBody profile={profile} />
      </div>

      <div className="">
        <ProfileFriends profile={profile} />
      </div>
    </div>
  );
};

export default ProfileContainer;



