const User = require('../../../models/User')
const UserMessage = require('../../../models/UserMessage')
const Subscriber = require('../../../models/Subscriber')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    isSubscribed: req.body.subscribe
  })
  user.generatePassword(req.body.password)
  user.saveImage(req.body.username)
  user.save()
    .then(newUser => {
      if(newUser.isSubscribed) {
        new Subscriber({
          username: newUser.username,
          email: newUser.email
        }).save()
      }
      let token = newUser.generateToken()
      newUser.refreshToken.push({ token: token.refresh, isLoggedOut: false, uid: token.uid })
      newUser.markModified('refreshToken')
      newUser.save()
      return res.status(200).json({ success: true, token: token.access })
    })
    .catch(e => {
      return res.status(500).json({ success: false, msg: e })
    })
}

const profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).exec()
    return res.status(200).json({ success: true, info: { ...user, password: null, refreshToken: null } })
  } catch(e) {
    console.error(e)
  }
}

const saveMessage = (req, res) => {
  try {
    new UserMessage({
      name: req.body.name,
      email: req.body.email,
      msg: req.body.msg
    }).save()
    return res.status(200).json({ success: true, msg: 'success' })
  } catch(e) {
    console.log(e)
    return res.status(500).json({ success: false, msg: 'error' })
  }
}

const updateUsername = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username }).exec()
    if(user) {
      return res.status(400).json({ success: false, info: 'username', msg: 'Username has been taken' })
    } else {
      let usr = await User.findById(req.params.id).exec()
      if(!usr.comparePasswords(req.body.password)) { return res.status(401).json({ success: false, info: 'password', msg: 'Incorrect password' }) }
      let token = jwt.decode(req.headers.authorization.split(' ')[1])
      let refTokenField = ''
      User.findByIdAndUpdate(
        req.params.id,
        { 
          $set: { username: req.body.username },
          $pull: { refreshToken: { uid: token.uid} }
        },
        { new: true }
      ).then(u => {
        let token = u.generateToken()
        u.refreshToken.push({ uid: token.uid, token: token.refresh, isLoggedOut: false })
        u.markModified('refreshToken')
        u.save()
        return res.status(200).json({ success: true, msg: 'Username updated', token: token.access })
      }).catch(e => {
        return res.status(500).json({ success: false, msg: e })
      })
    }
    
  } catch(e) {
    return res.status(500).json({ success: false, msg: e })
  }
}

module.exports = { register, profile, saveMessage, updateUsername }