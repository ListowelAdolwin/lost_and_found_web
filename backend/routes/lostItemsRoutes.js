const express = require('express');
const { addLostItem, getLostItems, getUserProfileLostItems } = require('../controllers/lostItemsController');
const {verifyToken} = require('../controllers/authController.js')


const router = express.Router()

router.post("/add", verifyToken, addLostItem)
router.get("/profile/:id", getUserProfileLostItems)
router.get("/", getLostItems)

module.exports = router