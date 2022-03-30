const express = require('express')
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/questions', async (req, res) => {
  try {
    const ans = await Question.find()
    res.json(ans)
  } catch (e) {
    res.send(e)
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { body, session } = req
  const { questionText } = body
  const { username } = session
  try {
    await Question.create({ questionText, author: username })
    res.send('Question created')
  } catch (e) {
    res.send(e)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res) => {
  const { body } = req
  const { _id, answer } = body
  try {
    await Question.findByIdAndUpdate(_id, { answer })
    req.send('Successfully answered')
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
