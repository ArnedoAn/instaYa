const express = require('express')
const jwt = require('jsonwebtoken')
const userSchema = require('../models/user')
const { checkPassword } = require('../controllers/pwdController')
const router = express.Router()

// Route to login user
router.post('/', async (req, res) => {
  const { user, password } = req.body
  const actualUser = await userSchema.findOne({ user })
  if (await checkPassword(actualUser.get('password'), password)) {
    const token = generateAccesToken(user)
    res.json({ message: 'success', token })
  } else {
    res.json({ message: 'failed', error: 'Invalid email or password' })
  }
})

router.get('/', async (req, res) => {
  res.send('Hoa')
})

function generateAccesToken (email) {
  return jwt.sign(email, process.env.TOKEN)
}

module.exports = router
