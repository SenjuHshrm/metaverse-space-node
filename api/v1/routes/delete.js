const Router = require('express').Router
const passport = require('passport')
const router = Router()
const { authCtrl } = require('../controllers')

router
  .delete('/logout', authCtrl.logout)

module.exports = router