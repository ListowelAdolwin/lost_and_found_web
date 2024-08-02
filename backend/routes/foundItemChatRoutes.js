const express = require("express");
const { verifyToken } = require("../controllers/authController");
const {addRetrieveChat, closeChat} = require('../controllers/foundItemChatController')

const router = express.Router()

router.post("/chat", verifyToken, addRetrieveChat)
router.get("close/:chatId", verifyToken, closeChat)

module.exports = router