import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import pinnedContacts from "../../hooks/useGetPinnedContacts";
import { unPinContact } from "../../hooks/useGetPinnedContacts";
import { useEffect } from "react";
// import useGetPinnedContacts from "../../hooks/useGetPinnedContacts";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { contacts } = pinnedContacts();

  const pinnedConversations = conversations.filter((conversation) =>
    contacts.includes(conversation._id)
  );
  const otherConversations = conversations.filter(
    (conversation) => !contacts.includes(conversation._id)
  );

  useEffect(() => {
    console.log("Pinned: ");
    console.log(pinnedConversations);
  }, [conversations]);

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
