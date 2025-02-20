import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileContainer from "../../components/profile/ProfileContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/utility/NavBar";
import ProfileSearchBar from "../../components/utility/ProfileSearchBar";
import toast from "react-hot-toast";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/profile/${userId}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProfile(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
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
