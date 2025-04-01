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
		// New fields for disappearing messages
		isDisappearing: {
			type: Boolean,
			default: false,
		},
		disappearAt: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;