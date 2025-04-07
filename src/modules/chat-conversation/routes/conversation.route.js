const express = require("express");
const { createConversation, getConversations } = require("./../controllers/conversation.controller");
const { verifyToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/", verifyToken, createConversation);
router.post("/get/all", verifyToken, getConversations);

module.exports = router;
