const Router = require('express').Router
const passport = require('passport')
const router = Router()
const { userCtrl } = require('../controllers')

router
  .put('/update-username/:id', passport.authenticate('jwt', { session: false }), userCtrl.updateUsername)

module.exports = router