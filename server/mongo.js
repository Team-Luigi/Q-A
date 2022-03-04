const mongoose = require('mongoose');

let photoSchema = mongoose.Schema({
  id: Number,
  url: String
})

let answerSchema = mongoose.Schema({
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  photos: [photoSchema]
})

let questionSchema = mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answer: [answerSchema]
})

let Questions = mongoose.model('Questions', questionSchema);

