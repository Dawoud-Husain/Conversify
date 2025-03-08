import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileContainer from "../../components/profile/ProfileContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/utility/NavBar";
import ProfileSearchBar from "../../components/utility/ProfileSearchBar";
import toast from "react-hot-toast";
import useGetProfile from "../../hooks/useGetProfile";

const Profile = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const { profile, loading } = useGetProfile(userId); // Fetch the profile data

  // Show a loading spinner while fetching the profile
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex flex-row h-full w-full pt-20 justify-center items-center">
          <div className="loading loading-spinner text-primary"></div>
        </div>
      </>
    );
  }

  // Show an error message if the profile is not found
  if (!profile) {
    return (
      <>
        <NavBar />
        <div className="flex flex-row h-full w-full pt-20 justify-center items-center">
          <p className="text-gray-500">User not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-[300px]">
        <ProfileSearchBar />
      </div>
      <div className="flex flex-row h-full w-full pt-20">
        <ProfileContainer profile={profile} />
      </div>
    </>
  );
};

export default Profile;