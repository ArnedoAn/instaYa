const express = require("express");
const userSchema = require("../models/user");
const { hashPassword } = require("../controllers/pwdController");
const router = express.Router();

// Register route

router.post("/", async (req, res) => {
  try {
    // Hashing password
    const pwd = await hashPassword(req.body.password);

    // Setting password to object
    req.body.password = pwd;

    // Creating and saving model into database
    const user = userSchema(req.body)
      .save()
      .then((data) => res.json(data));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
