const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

const opts = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if(!user) return done(null, false)
      return done(null, user)
    })
    .catch(e => {
      return done(err, false)
    })
}))