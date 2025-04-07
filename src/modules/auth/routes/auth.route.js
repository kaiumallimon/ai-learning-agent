const express = require("express");
const { registerUser, loginUser, logoutUser, testProtected } = require("../controllers/auth.controller");
const { verifyToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyToken, testProtected);
router.get("/logout", logoutUser); 

module.exports = router;
