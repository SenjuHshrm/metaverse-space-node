const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = () => {
  mongoose.connection
    .on('open', () => {
      console.log('Connected to metaverse database')
    })
    .on('error', (e) => {
      console.error('An error occured while connecting to database')
    })
  mongoose.connect(process.env.MONGODB_URL)
}