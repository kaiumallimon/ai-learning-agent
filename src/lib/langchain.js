const {GoogleGenerativeAI} = require("@google/generative-ai");
const {config} = require("../config/env.js");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

exports.getGeminiChatResponse = async (messages) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({ history: messages });
  const result = await chat.sendMessage(messages[messages.length - 1].parts[0].text);
  return result.response.text();
};
