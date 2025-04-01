import mongoose from "mongoose";

const translatedConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TranslatedMessage",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const translatedConversation = mongoose.model(
  "TranslatedConversation",
  translatedConversationSchema
);

export default translatedConversation;
