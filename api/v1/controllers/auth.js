const User = require('../../../models/User')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username }).exec()
    if(!user) return res.status(401).json({ success: false, msg: 'Invalid credentials' })
    if(!user.comparePasswords(req.body.password)) return res.status(401).json({ success: false, msg: 'Invalid credentials' })
    let token = user.generateToken()
    user.refreshToken.push({ token: token.refresh, isLoggedOut: false, uid: token.uid })
    user.markModified('refreshToken')
    user.save()
    return res.status(200).json({ success: true, token: token.access })
  } catch(e) {
    console.error(e)
    return res.status(500).json({ success: false, msg: e.toString() })
  }
}

const logout = async (req, res) => {
  try {
    let token = jwt.decode(req.headers.authorization.split(' ')[1])
    await User.findByIdAndUpdate(token.sub, { $pull: { refreshToken: { uid: token.uid } } }).exec()
    return res.status(200).json({ success: true, msg: 'logout' })
  } catch(e) {
    console.log(e)
    return res.status(500).json({ success: false, msg: e.toString() })
  }
}

module.exports = { login, logout }