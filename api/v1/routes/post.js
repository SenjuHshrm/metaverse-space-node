const Router = require('express').Router
const router = Router()
const { userCtrl } = require('../controllers')

const multer = require("multer")
const uploadAvatar = multer({ dest: './public/profile-img' })

router
  .post('/login', userCtrl.login)
  .post('/register', uploadAvatar.single('img'), userCtrl.register)

module.exports = router