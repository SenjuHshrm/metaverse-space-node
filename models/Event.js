const mongoose = require('mongoose')

let eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true }
}, { timestamps: true })

let Event = mongoose.model('event', eventSchema)

module.exports = Event