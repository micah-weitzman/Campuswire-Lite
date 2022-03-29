const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  name: String,
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  author: { type: String, require: true },
})

module.exports = model('Question', questionSchema)
