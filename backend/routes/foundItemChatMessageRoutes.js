const express = require("express");
const { verifyToken } = require("../controllers/authController");

const router = express.Router()

router.post("/new-message", verifyToken, addMessage)
router.get("/profile/:id", getClaimedItems)
router.get("/:itemId", getItemClaims)
router.post("/approve/:claimId", approveClaim)

module.exports = router