const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String, required: false },
  author: { type: String, require: true },
})

module.exports = model('Question', questionSchema)
