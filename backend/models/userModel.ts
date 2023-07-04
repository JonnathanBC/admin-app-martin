import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  loginCode: {
    type: String,
    required: true,
    length: 6
  },
  roles: {
    admin: Boolean,
    seller: Boolean
  }
})

export const User = model('User', userSchema)
