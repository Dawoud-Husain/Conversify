import User from "../models/user.model.js";
import { translateText } from "./translation.service.js";

export const translateMessageIfNeeded = async (
  senderId,
  receiverId,
  messageText
) => {
  const [sender, receiver] = await Promise.all([
    User.findById(senderId),
    User.findById(receiverId),
  ]);

  if (!sender || !receiver || sender.language === receiver.language) {
    return messageText; // no translation needed
  }

  return await translateText(messageText, receiver.language, sender.language);
};
