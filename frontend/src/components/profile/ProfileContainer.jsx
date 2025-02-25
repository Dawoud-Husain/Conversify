// import ProfileImage from "./ProfileImage";
// import ProfileHeader from "./ProfileHeader";
// import ProfileBody from "./ProfileBody";
// import ProfileInfo from "./ProfileInfo";
// import { useAuthContext } from "../../context/AuthContext";
// import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
// import { useEffect, useState } from "react";

// const ProfileContainer = ({ profile }) => {
//   const { authUser, setAuthUser } = useAuthContext();
//   const [render, setRender] = useState(true);
//   useEffect(() => {
//     profile._id === authUser._id ? setRender(true) : setRender(false);
//   }, [profile]);
//   return (
//     <div className="flex h-full w-full pl-10 pt-14 pr-10">
//       <div className="flex-shrink-0">
//         <img
//           src={profile.profilePic}
//           alt="Tailwind CSS chat bubble component"
//           className="w-44 h-44 rounded-full object-cover"
//         />
//         {render && <ProfilePictureUploadButton />}
//       </div>
//       <div className="flex flex-col flex-grow pt-8 pl-8">
//         <ProfileHeader profile={profile} className="mb-2" />
//         <ProfileBody profile={profile} className="flex-grow" />
//       </div>

//       {/* Profile Info (Optional) */}
//       <div className="flex-shrink-0">
//         <ProfileInfo profile={profile} />
//       </div>
//     </div>
//   );
// };

// export default ProfileContainer;





// import ProfileImage from "./ProfileImage";
// import ProfileHeader from "./ProfileHeader";
// import ProfileBody from "./ProfileBody";
// import ProfileInfo from "./ProfileInfo";
// import { useAuthContext } from "../../context/AuthContext";
// import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast"; // Import toast for notifications

// const ProfileContainer = ({ profile }) => {
//   const { authUser } = useAuthContext();
//   const [render, setRender] = useState(true);
//   const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Loading state for the button

//   useEffect(() => {
//     profile._id === authUser._id ? setRender(true) : setRender(false);
//   }, [profile]);

//   const handleAddFriend = async () => {
//     setIsLoading(true); // Start loading
//     try {
//       // Send a POST request to the backend to add a friend
//       const response = await fetch(`/api/users/friends/request/${profile._id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json();
//       if (data.error) throw new Error(data.error);

//       // Update the state to indicate the friend request was sent
//       setIsFriendRequestSent(true);
//       toast.success("Friend request sent!"); // Success toast
//     } catch (error) {
//       console.error("Error adding friend:", error.message);
//       toast.error("Failed to send friend request."); // Error toast
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="flex h-full w-full pl-10 pt-14 pr-10">
//       <div className="flex-shrink-0">
//         <img
//           src={profile.profilePic}
//           alt="Tailwind CSS chat bubble component"
//           className="w-44 h-44 rounded-full object-cover"
//         />
//         {render && <ProfilePictureUploadButton />}
//       </div>
//       <div className="flex flex-col flex-grow pt-8 pl-8">
//         <ProfileHeader profile={profile} className="mb-2" />
//         <ProfileBody profile={profile} className="flex-grow" />

//         {/* Add Friend Button */}
//         {!render && (
//           <div className="mt-4">
//             <button
//               onClick={handleAddFriend}
//               className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
//               style={{ fontFamily: "var(--header-font)" }}
//               disabled={isFriendRequestSent || isLoading} // Disable button after request is sent or while loading
//             >
//               {isLoading ? "Sending..." : isFriendRequestSent ? "Request Sent" : "Add Friend"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Profile Info (Optional) */}
//       <div className="flex-shrink-0">
//         <ProfileInfo profile={profile} />
//       </div>
//     </div>
//   );
// };

// export default ProfileContainer;



import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileInfo from "./ProfileInfo";
import { useAuthContext } from "../../context/AuthContext";
import ProfilePictureUploadButton from "../utility/ProfilePictureUploadButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Import toast for notifications

const ProfileContainer = ({ profile }) => {
  const { authUser } = useAuthContext();
  const [render, setRender] = useState(true);
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  useEffect(() => {
    profile._id === authUser._id ? setRender(true) : setRender(false);
  }, [profile]);

  const handleAddFriend = async () => {
    setIsLoading(true); // Start loading
    try {
      // Send a POST request to the backend to add a friend
      const response = await fetch(`/api/users/friends/request/${profile._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Update the state to indicate the friend request was sent
      setIsFriendRequestSent(true);
      toast.success("Friend request sent!"); // Success toast
    } catch (error) {
      console.error("Error adding friend:", error.message);
      toast.error("Failed to send friend request."); // Error toast
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex h-full w-full pl-10 pt-14 pr-10">
      <div className="flex-shrink-0">
        <img
          src={profile.profilePic}
          alt="Tailwind CSS chat bubble component"
          className="w-44 h-44 rounded-full object-cover"
        />
        {/* Add Friend Button */}
        {!render && (
          <div className="mt-4">
            <button
              onClick={handleAddFriend}
              className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
              style={{ fontFamily: "var(--header-font)" }}
              disabled={isFriendRequestSent || isLoading} // Disable button after request is sent or while loading
            >
              {isLoading ? "Sending..." : isFriendRequestSent ? "Request Sent" : "Add Friend"}
            </button>
          </div>
        )}
        {render && <ProfilePictureUploadButton />}
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