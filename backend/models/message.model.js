import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: true,
    },
    originalMessage: {
      type: String,
      required: false,
    },
    // Include replyMsg in the new message
    replyMsg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: false,
    },
    reaction: {
      type: String,
      required: false,
    },
    timeRead: {
      type: Date,
      required: false,
    },
    // createdAt, updatedAt
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
