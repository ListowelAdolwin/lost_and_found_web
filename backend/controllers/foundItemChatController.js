import FoundItem from "../models/FoundItem";
import FoundItemChat from "../models/FoundItemChat";
import FoundItemChatMessage from "../models/FoundItemChatMessage";
import User from "../models/User";

const addRetrieveChat = async (req, res) => {
  const { itemId, ownerId } = req.body;

  if (!itemId || !ownerId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const item = await FoundItem.findById(itemId)
    const owner = await User.findById(owner)
    const poster = item.poster

    const chatExist = await FoundItemChat.find({item, poster, owner}).populate('item')

    if (chatExist) {
      const chatMessages = await FoundItemChatMessage.find({chat: chatExist})
      return res.json({chatMessages: chatMessages, foundItemChat: chatExist})
    }

    const newFountItemChat = new FoundItemChat({ item, owner, poster });
    await newFountItemChat.save();
    res.status(201).json({foundItemChat: newFountItemChat, chatMessages: [] });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving item chat." });
  }
};

const closeChat = async (req, res) => {
  const {chatId} = req.params

  try {
    const chat = await FoundItemChat.findById(chatId)
    if (!chat){
      return res.json({message: "Chat not found"})
    }
    chat.isClosed = true;
    await chat.save()
    return res.json({message: "Chat closed!"})
  } catch (error) {
    console.log(error)
    return res.json({message: "Error closing found item chat"})
  }
}

module.exports = {
  addRetrieveChat,
  closeChat
};
