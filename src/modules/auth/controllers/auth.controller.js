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

// GET /logout
const logoutUser = async (req, res) => {
  try {
    // First check if there's an active session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return res.status(200).json({ 
        success: true,
        message: 'No active session - already logged out' 
      });
    }

    // If logged in, proceed with sign out
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      return res.status(400).json({ 
        success: false,
        message: error.message || 'Failed to logout'
      });
    }

    // Verify logout was successful
    const { data: { session: postLogoutSession } } = await supabase.auth.getSession();
    
    if (postLogoutSession) {
      console.warn('Session still exists after logout attempt');
      return res.status(500).json({
        success: false,
        message: 'Logout incomplete - session still exists'
      });
    }

    return res.status(200).json({ 
      success: true,
      message: '✅ Logout successful' 
    });

  } catch (err) {
    console.error('Unexpected logout error:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during logout'
    });
  }
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
  logoutUser,
};
