const mongoose = require('mongoose')

let subsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})

let Subscriber = mongoose.model('subscriber', subsSchema)

module.exports = Subscriber