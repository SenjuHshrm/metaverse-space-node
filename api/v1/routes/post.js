const Router = require('express').Router
const router = Router()
const { userCtrl, authCtrl } = require('../controllers')

const multer = require("multer")
const uploadAvatar = multer({ dest: './public/profile-img' })

router
  .post('/login', authCtrl.login)
  .post('/register', userCtrl.register)

module.exports = router