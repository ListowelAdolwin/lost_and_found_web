import FoundItem from "../models/FoundItem";
import FoundItemChat from "../models/FoundItemChat";
import FoundItemChatMessage from "../models/FoundItemChatMessage";
import User from "../models/User";

const addMessage = async (req, res) => {
  const { chatId, message, sender } = req.body;

  if (!chatId || !message || !sender) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const chat = await FoundItemChat.findById(chatId)
    if (!chat) {
      return res.json({message: "Couldn't find chat"})
    }

    const newMessage = new FoundItemChatMessage({ chat, message, sender });
    await newMessage.save();
    res.status(201).json({message: "Message saved" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving new message" });
  }
};


module.exports = {
  addMessage,
};
