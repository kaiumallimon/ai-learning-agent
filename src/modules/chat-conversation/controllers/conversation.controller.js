const { supabase } = require("../../../lib/supabase");

// Create a new conversation
const createConversation = async (req, res) => {
  const { user_id, title } = req.body;

  const { data, error } = await supabase
    .from("conversations")
    .insert([{ user_id, title }])
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json({ message: "Conversation created", conversation: data });
};

// Get all conversations of a user
const getConversations = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ message: "User ID is required" });

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ message: error.message });

  res.status(200).json(data);
};

module.exports = { createConversation, getConversations };
