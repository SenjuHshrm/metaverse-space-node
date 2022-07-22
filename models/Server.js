const mongoose = require('mongoose')

let serverSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  port: { type: Number, required: true },
  isFull: { type: Boolean, required: true }
})

let Server = mongoose.model('server', serverSchema)

module.exports = Server