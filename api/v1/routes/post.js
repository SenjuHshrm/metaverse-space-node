const Router = require('express').Router
const router = Router()
const { userCtrl, authCtrl, eventCtrl } = require('../controllers')
const passport = require('passport')
const path = require('path')
const multer = require("multer")
const eventsImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.appRoot, '/public/events'))
  },
  filename: (req, file, cb) => {
    let title = req.body.title.replace(' ', '-').toLowerCase(),
        format = file.mimetype.split('/')[1]
    cb(null, `${title}.${format}`)
  }
})
const uploadEventImg = multer({ dest: '/public/events', storage: eventsImgStorage })

router
  .post('/login', authCtrl.login)
  .post('/register', userCtrl.register)
  // .post('/save-event', passport.authenticate('jwt', { session: false }), eventCtrl.saveEvent)
  .post('/save-event', uploadEventImg.single('img'), eventCtrl.saveEvent)

module.exports = router