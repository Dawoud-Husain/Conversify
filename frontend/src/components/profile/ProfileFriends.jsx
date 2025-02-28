import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import {getFriends} from '../../hooks/useGetFriends'
import { Link } from "react-router-dom";
const ProfileFriends = ({ profile }) => {
  const {contacts } = getFriends(profile._id)
  // const username = authUser.username;

return (
    <>
    <div>
        <h1 className='mb-2 text-black'><b>FRIENDS</b></h1>
        {contacts.length === 0 && <p className='mb-2 text-black'>Start adding friends!</p>}
    </div>
    {contacts.length !== 0 &&     <div className="relative overflow-y-auto border border-black-300" style={{ maxHeight: '400px' }}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase">
            </thead>
            <tbody>
                {contacts.map((friend, index) => (
                    <tr key={index} className="bg-white border-b">
                        <td className="px-6 py-4 flex items-center">
                        <Link to={`/profile/${friend._id}`}>
                            <img
                            
                                src={friend.profilePic}
                                alt="Profile"
                                className="rounded-full object-cover w-10 h-10 mr-4"
                            />
                        </Link>

                            <span>@{friend.username}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
    </>
);
};
export default ProfileFriends;
