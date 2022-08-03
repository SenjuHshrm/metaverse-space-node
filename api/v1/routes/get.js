const Router = require('express').Router
const passport = require('passport')
const router = Router()
const { userCtrl, eventCtrl } = require('../controllers')

router
  .get('/profile/:id', userCtrl.profile)
  .get('/event/latest', eventCtrl.getLatestEvent)
  .get('/event/all', passport.authenticate('jwt', { session: false }), eventCtrl.getAllEvents)
  .get('/event/view/:id', eventCtrl.viewEvent)

module.exports = router