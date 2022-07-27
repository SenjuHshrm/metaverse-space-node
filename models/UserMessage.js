const mongoose = require('mongoose')

let userMsgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  msg: { type: String, required: true }
})

let UserMessage = mongoose.model('user-message', userMsgSchema)

module.exports = UserMessage