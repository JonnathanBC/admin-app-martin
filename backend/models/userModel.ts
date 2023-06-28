import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  loginCode: {
    type: String,
    require: true,
    length: 6
  },
  roles: {
    admin: Boolean,
    seller: Boolean
  }
})

export const User = model('User', userSchema)
