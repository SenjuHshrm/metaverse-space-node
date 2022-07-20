require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express()

/**
 * server setup
 */
app.set('port', require('./config/port')(process.env.NODE_ENV))

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'app')))


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './app/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server is running at port ${app.get('port')}`)
})

module.exports = app
