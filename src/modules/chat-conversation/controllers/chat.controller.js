const { supabase } = require("../../../lib/supabase");
const { getGeminiChatResponse } = require("../../../lib/langchain");

// Send a message and receive a response (streamed or full)
const sendMessage = async (req, res) => {
  const { user_id, conversation_id, message, stream } = req.body;

  // Store user message
  const { data: userMessage, error: userMessageError } = await supabase
    .from("messages")
    .insert([{ user_id, conversation_id, content: message, sender: "human" }])
    .single();

  if (userMessageError) return res.status(400).json({ message: userMessageError.message });

  // Get the chat history for the conversation
  const messages = await getChatHistory(conversation_id);

  // Format messages for Gemini AI (convert 'user' to 'human')
  const formattedMessages = messages.map(msg => ({
    role: msg.sender === 'user' ? 'human' : 'ai', // Convert 'user' to 'human', keep others as 'ai'
    content: msg.content
  }));

  // Add the user's new message as 'human'
  formattedMessages.push({ role: 'human', content: message });

  // Get AI response from Gemini
  const aiResponse = await getGeminiChatResponse(formattedMessages);

  // Store AI message in the database
  const { data: aiMessage, error: aiMessageError } = await supabase
    .from("messages")
    .insert([{ user_id, conversation_id, content: aiResponse, sender: "ai" }])
    .single();

  if (aiMessageError) return res.status(400).json({ message: aiMessageError.message });

  // Check if 'stream' is true, if so stream the response, otherwise return the full response
  if (stream) {
    // Stream the response character by character
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for (let i = 0; i < aiResponse.length; i++) {
      res.write(`data: ${aiResponse[i]}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay to control typing speed
    }

    res.end();
  } else {
    // Return the full response at once
    res.status(200).json({ message: aiResponse });
  }
};


// Get the chat history for a given conversation
const getChatHistory = async (req,res) => {
  const { conversation_id } = req.params;
  if (!conversation_id) return res.status(400).json({ message: "Conversation ID is required" });
  const { data, error } = await supabase
    .from("messages")
    .select("content, sender")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: true });

  if (error) return [];

  // Filter out messages where the sender is "system" and ensure there are no undefined messages
  const messages = data
    .filter((msg) => msg.sender !== "system" && msg.content !== undefined) // Exclude system role and undefined content
    .map((msg) => ({
      role: msg.sender === "human" ? "human" : "ai", // Map user to "human" and AI to "AI"
      content: msg.content,
    }));

    res.status(200).json(messages);
};

module.exports = { sendMessage, getChatHistory };
