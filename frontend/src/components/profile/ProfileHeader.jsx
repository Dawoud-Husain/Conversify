import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import countryEmoji from "country-emoji";
import LiveTimeDisplay from "../utility/LiveTimeDisplay";

const ProfileHeader = ({ profile }) => {
  // const { authUser } = useAuthContext();
  // const fullName = authUser.firstName + " " + authUser.lastName;
  // const username = authUser.username;

  const fullName =
    profile.firstName +
    " " +
    profile.lastName +
    " " +
    countryEmoji.flag(profile.country);

  return (
    <div className="flex flex-col self-start pb-10">
      <div className="relative"></div>
      <h1
        className="text-3xl font-bold text-gray-900"
        style={{ fontFamily: "var(--header-font)" }}
      >
        {fullName}
      </h1>

      <p className="text-gray-600 text-lg">@{profile.username}</p>
      <LiveTimeDisplay timeZone={profile.timezone} />
      <p className="text-gray-600 text-sm">{profile.country}</p>

      {/* <div className="mt-4 flex space-x-4">
        <button className="px -6 py-3 bg-yellow-200 text-gray-900 font-semibold rounded-md" />
        <button
          className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
          style={{ fontFamily: "var(--header-font)" }}
        >
          Connect
        </button>

        <button
          className="btn w-44 h-8 px-8 font-semibold rounded-full border-2 btn-outline btn-no-outline:hover"
          style={{ fontFamily: "var(--header-font)" }}
        >
          Message
        </button>
      </div> */}
    </div>
  );
};
export default ProfileHeader;
