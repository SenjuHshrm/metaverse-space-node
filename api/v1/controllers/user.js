const User = require('../../../models/User')

const login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username }).exec()
    if(!user) return res.status(401).json({ success: false, msg: 'Invalid credentials' })
    if(!user.comparePasswords(req.body.password)) return res.status(401).json({ success: false, msg: 'Invalid credentials' })
    let token = user.generateToken()
    user.refreshToken.push({ token: token.refresh, isLoggedOut: false })
    user.markModified('refreshToken')
    user.save()
    return res.status(200).json({ success: true, info: token.access })
  } catch(e) {
    console.error(e)
    return res.status(500).json({ success: false, msg: '' })
  }
}

const register = (req, res) => {

}

const profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).exec()
    return res.status(200).json({ success: true, info: { ...user, password: null, refreshToken: null } })
  } catch(e) {
    console.error(e)
  }
}

module.exports = { login, register, profile }