require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.send('This is the backend for Metaverse Space')
})

app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
