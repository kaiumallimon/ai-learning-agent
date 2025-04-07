const express = require("express");
const { registerUser, loginUser, testProtected } = require("../controllers/auth.controller");
const { verifyToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyToken, testProtected);

module.exports = router;
