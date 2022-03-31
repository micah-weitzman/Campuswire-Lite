const express = require('express')
const User = require('../models/user')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async ({ body }, res, next) => {
  const { username, password } = body
  try {
    await User.create({ username, password })
    res.send('User created')
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    User.findOne({ username, password }, (err, user) => {
      if (user) {
        req.session.username = username
        req.session.password = password
        res.send('logged in')
      } else {
        next(Error('User not found'))
      }
    })
  } catch (e) {
    next(e)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  // res.session = null
  res.send('user logged out')
})

module.exports = router
