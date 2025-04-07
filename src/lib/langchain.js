// const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai"); // ✅ Correct Import
// const { BufferMemory } = require("langchain/memory");
const {SYSTEM_PROMPT} = require("../constants/system.prompt");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7
});

exports.getGeminiChatResponse = async (messages) => {
  try {

    // Prepend the system prompt to the conversation history
    const fullMessages = [SYSTEM_PROMPT, ...messages];

    console.log("Sending message to Gemini AI with system prompt:", fullMessages);

    const response = await chatModel.invoke(fullMessages);

    console.log("Received response from Gemini AI:", response);

    return response.content;
  } catch (error) {
    console.error("Error in Gemini response:", error);
    return "Sorry, I couldn't process that.";
  }
};


