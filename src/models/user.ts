import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose, { Document, Schema } from 'mongoose'
import { APP_SECRET } from '../config/database'

export interface User extends Document {
  name: string,
  username: string,
  hash: string,
  salt: string,
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  hash: String,
  salt: String,
})

userSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.validPassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.hash === hash
}

userSchema.methods.generateJwt = function() {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 1)

  return jwt.sign({
    _id: this._id,
    username: this.username,
    name: this.name,
    exp: expiry.getTime() / 1000,
  }, APP_SECRET)
}

const User = mongoose.model<User>('User', userSchema)
export default User
