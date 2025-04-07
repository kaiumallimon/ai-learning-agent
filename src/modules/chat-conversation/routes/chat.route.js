const express = require("express");
const { sendMessage, getChatHistory } = require("./../controllers/chat.controller");
const { verifyToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.get("/history/:conversation_id", verifyToken, getChatHistory);

module.exports = router;
