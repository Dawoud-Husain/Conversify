import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const delete_conversation = async (req, res) => {
    try {
        const { id: otherUserId } = req.params;
        const currentUserId = req.user._id;

        // Find conversation between current user and other user
        const conversation = await Conversation.findOne({
            participants: { $all: [currentUserId, otherUserId] },
        });

        if (!conversation) {
            return res.status(404).json({
                error: "Conversation not found",
            });
        }

        // Delete conversation and associated messages
        await Conversation.findByIdAndDelete(conversation._id);
        await Message.deleteMany({ _id: { $in: conversation.messages } });
        res.status(200).json({ message: "Conversation deleted successfully" });
        
    } catch (error) {
        console.log("Error in conversation controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};