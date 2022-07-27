const User = require('../../../models/User')
const UserMessage = require('../../../models/UserMessage')
const Subscriber = require('../../../models/Subscriber')

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
      console.log(e)
      return res.status(500).json({ success: false, msg: e.code })
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

module.exports = { register, profile, saveMessage }