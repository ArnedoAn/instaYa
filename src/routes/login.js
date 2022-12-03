const express = require("express");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const { checkPassword } = require("../controllers/pwdController");
const router = express.Router();

// Route to login user
router.post("/", async (req, res) => {
  try {
    const { user, password } = req.body;
    const actualUser = await userSchema.findOne({ user });
    if (await checkPassword(actualUser.password, password)) {
      const token = generateAccesToken(user);
      res.json({ message: "success", token });
    } else {
      res.json({ message: "failed", error: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

function generateAccesToken(email) {
  return jwt.sign(email, process.env.TOKEN);
}

module.exports = router;
