// core imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();



// local imports
const authRoute = require('./modules/auth/routes/auth.route');
const conversationRoute = require('./modules/chat-conversation/routes/conversation.route');
const chatRoute = require('./modules/chat-conversation/routes/chat.route');

// app configs
const app = express();


// middlewares
app.use(cors());
app.use(express.json());


// routes
app.use("/api/auth", authRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/chat", chatRoute);
// test api:
app.get("/api/test", (req, res) => {
  res.json({ message: "Working!!" });
});

module.exports = app;
