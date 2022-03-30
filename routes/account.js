const express = require('express')
const User = require('../models/user')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async ({ body }, res) => {
  const { username, password } = body
  try {
    await User.create({ username, password })
    res.send('User created')
  } catch (e) {
    res.send('Error occured on creating new user')
  }
})

router.post('/login', async (req, res) => {
  const { body } = req
  const { username, password } = body
  try {
    User.findOne({ username, password }, (err, user) => {
      if (user) {
        req.session.username = username
        req.session.password = password
        res.send('logged in')
      } else {
        res.send('not logged in')
      }
    })
  } catch {
    res.send('Error occured when loggin in')
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = null
  res.send('user logged out')
})

module.exports = router
