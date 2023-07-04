import { Schema, model } from 'mongoose'

const clientSchema = new Schema({
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
  documentType: {
    type: String,
    required: true
  },
  documentValue: {
    type: String,
    required: true
  },
  sale: {
    count: Number,
    amount: Number
  }
})

export const Client = model('Client', clientSchema)
