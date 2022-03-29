const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  if (req.session.username !== null && req.session.username !== '') {
    next()
  } else {
    next(new Error('User not authenticated'))
  }
})

module.exports = router
