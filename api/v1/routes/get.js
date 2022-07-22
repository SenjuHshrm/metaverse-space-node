const Router = require('express').Router
const passport = require('passport')
const router = Router()
const { userCtrl } = require('../controllers')

router
  .get('/profile/:id', passport.authenticate('jwt', { session: false }), userCtrl.profile)

module.exports = router