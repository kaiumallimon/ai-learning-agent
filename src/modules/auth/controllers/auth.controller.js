const {supabase} = require("../../../lib/supabase")

// POST /register
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json({ message: "✅ Registration successful", data });
};

// POST /login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ message: error.message });
  }

  res.status(200).json({
    message: "✅ Login successful",
    token: data.session.access_token,
    user: data.user,
  });
};

// GET /verify (protected)
const testProtected = async (req, res) => {
  res.json({
    message: "🔐 Auth successful",
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  testProtected,
};
