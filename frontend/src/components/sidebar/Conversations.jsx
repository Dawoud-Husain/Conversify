import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import pinnedContacts from "../../hooks/useGetPinnedContacts";
import { unPinContact } from "../../hooks/useGetPinnedContacts";
import { useEffect } from "react";
import { getFriendNotifications,deleteFriendNotifications } from "../../hooks/useGetFriendNotifications";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const handleNotifications = (notifications) => {
  notifications.forEach(notification => {
    const handleClose = (t, notification) => {
      toast.dismiss(t.id);
      deleteFriendNotifications(notification._id)
    };

    toast.custom((t) => (
      <div
        className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <Link to={`/profile/${notification._id}`}>
        <img
          className="h-10 w-10 rounded-full"
          src={notification.profilePic}
          alt=""
        />
          </Link>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
        {notification.firstName + ' ' + notification.lastName}
          </p>
          <p className="mt-1 text-sm text-gray-500">
        New Friend Added
          </p>
        </div>
      </div>
        </div>
        <div className="flex border-l border-gray-200">
      <button
        onClick={() => handleClose(t, notification)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Close
      </button>
        </div>
      </div>
    ));
    
  });
};

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { contacts } = pinnedContacts();
  const {notifications, setNotifications} = getFriendNotifications();
  useEffect(() => {
    handleNotifications(notifications);
  }, [notifications]);

  
  const pinnedConversations = conversations.filter((conversation) =>
    contacts.includes(conversation._id)
  );
  const otherConversations = conversations.filter(
    (conversation) => !contacts.includes(conversation._id)
  );

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Render the pinned contacts first */}
      {pinnedConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={
            idx === pinnedConversations.length - 1 &&
            otherConversations.length === 0
          }
          pinned={true}
        />
      ))}
      {/* Render the other conversations after */}
      {otherConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === otherConversations.length - 1}
          pinned={false}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
