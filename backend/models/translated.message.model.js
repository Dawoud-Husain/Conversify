import mongoose from "mongoose";

const translatedMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The message as the sender typed it
    originalMessage: {
      type: String,
      required: true,
    },

    // The language it was written in
    originalLanguage: {
      type: String,
      required: true,
    },

    // The translated version for the receiver
    translatedMessage: {
      type: String,
      required: true,
    },

    // The language the receiver prefers
    targetLanguage: {
      type: String,
      required: true,
    },

    replyMsg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TranslatedMessage",
      required: false,
    },

    reaction: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const TranslatedMessage = mongoose.model(
  "TranslatedMessage",
  translatedMessageSchema
);

export default TranslatedMessage;
