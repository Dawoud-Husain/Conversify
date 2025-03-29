import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { translateMessageIfNeeded } from "../services/translation.middleware.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, replyMsg } = req.body; // Extract message and replyMsg from req.body
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //Check if the sender is blocked by the receiver **/
    const receiver = await User.findById(receiverId);
    if (receiver?.blockedUsers.includes(senderId)) {
      return res
        .status(403)
        .json({ error: "You have been blocked by this user." });
    }

    //Check if the sender has blocked the receiver **/
    const sender = await User.findById(senderId);
    if (sender?.blockedUsers.includes(receiverId)) {
      return res.status(403).json({ error: "You have blocked this user." });
    }

    /**Proceed if not blocked **/
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const translatedMessage = await translateMessageIfNeeded(
      senderId,
      receiverId,
      message
    );

    const isTranslationNeeded = sender.language !== receiver.language;

    const newMessage = new Message({
      senderId,
      receiverId,
      message: isTranslationNeeded ? translatedMessage : message,
      originalMessage: isTranslationNeeded ? message : undefined,
      replyMsg,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // Populate the replyMsg field in the new message
    await newMessage.populate("replyMsg");
    const populatedMessage = newMessage;

    //Notify receiver via Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      populate: {
        path: "replyMsg",
        model: "Message",
      },
    }); // Populate messages and replyMsg

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reactMessage = async (req, res) => {
  try {
    const { reaction_emoji } = req.body;
    const { id: messageId } = req.params;
    const currentUserId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.reaction = reaction_emoji;
    await message.save();

    // Determine receiverId
    const receiverId = message.senderId.equals(currentUserId)
      ? message.receiverId
      : message.senderId;

    // Emit socket event to receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newReaction", message);
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in message reaction controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
