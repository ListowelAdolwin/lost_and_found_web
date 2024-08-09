const User = require('../../models/User.js');
const LostItemChat = require('../../models/lost-items/LostItemChat.js');
const LostItemChat = require('../../models/lost-items/LostItemChat.js');
const LostItem = require('../../models/LostItem.js');
const LostItemChatMessage = require('../../models/lost-items/LostItemChatMessage.js');

const addRetrieveChat = async (req, res) => {
  const { itemId, itemFounder } = req.body;

  if (!itemId || !itemFounder) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const item = await LostItem.findById(itemId)
    const itemFounder = await User.findById(itemFounder)
    const poster = item.poster

    const chatExist = await LostItemChat.findOne({ item, poster, itemFounder })
  .populate({
    path: 'item',
    select: 'name itemImages description poster',
  })
  .populate('poster', 'name reference')


    if (chatExist) {
      const chatMessages = await LostItemChatMessage.find({chat: chatExist}).sort({createdAt: -1})
      return res.json({chatMessages: chatMessages, lostItemChat: chatExist})
    }

    const newLostItemChat = new LostItemChat({ item, owner, poster });
    await newLostItemChat.save();
    res.status(201).json({lostItemChat: newLostItemChat, chatMessages: [] });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "An error occurred while retrieving item chat." });
  }
};

const closeChat = async (req, res) => {
  const {chatId} = req.params

  try {
    const chat = await LostItemChat.findById(chatId)
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
