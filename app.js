require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const app = express()
const { v1GET, v1POST, v1DELETE } = require('./api/v1/routes')


// server setup
app.set('port', require('./config/port')(process.env.NODE_ENV))
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'app')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
require('./config/passport')

// API Routes setup
app.use('/api/v1/get', v1GET)
app.use('/api/v1/post', v1POST)
app.use('/api/v1/delete', v1DELETE)

// Route for React Web App rendering
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './app/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server is running at port ${app.get('port')}`)
  require('./config/db')()
})

module.exports = app
