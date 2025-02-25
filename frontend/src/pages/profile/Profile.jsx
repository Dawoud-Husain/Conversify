import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileContainer from "../../components/profile/ProfileContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/utility/NavBar";
import ProfileSearchBar from "../../components/utility/ProfileSearchBar";
import toast from "react-hot-toast";
import useGetProfile from "../../hooks/useGetProfile";

const Profile = () => {
  const { userId } = useParams();
  const { profile } = useGetProfile(userId);

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
