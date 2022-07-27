const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')

let refreshTokenSchema = new mongoose.Schema({
  token: String,
  isLoggedOut: Boolean,
  uid: String
}, { timestamps: true })

let userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  isSubscribed: { type: Boolean, required: true },
  refreshToken: [refreshTokenSchema]
}, { timestamps: true })

userSchema.methods.generatePassword = function(pw) {
  this.password = bcrypt.hashSync(pw, 12)
}

userSchema.methods.comparePasswords = function(pw) {
  return bcrypt.compareSync(pw, this.password)
}

userSchema.methods.saveImage = function(username) {
  let usernameHash = crypto.createHash('md5').update(username).digest('hex')
  this.img = `https://gravatar.com/avatar/${usernameHash}?d=retro`
}

userSchema.methods.generateToken = function() {
  let uid = uuidv4()
  return {
    uid: uid,
    // access: jwt.sign({ sub: this._id, username: this.username, email: this.email, img: this.img, uid: uid }, process.env.JWT_SECRET, { expiresIn: '5m' }),
    access: jwt.sign({ sub: this._id, username: this.username, email: this.email, img: this.img, uid: uid }, process.env.JWT_SECRET),
    refresh: jwt.sign({ sub: this._id }, process.env.JWT_SECRET, { expiresIn: '1y' })
  }
}

const User = mongoose.model('user', userSchema)

module.exports = User