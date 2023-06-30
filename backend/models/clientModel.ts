import { Schema, model } from 'mongoose'

const clientSchema = new Schema({
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
  documentType: {
    type: String,
    require: true
  },
  documentValue: {
    type: String,
    require: true
  },
  sale: {
    count: Number,
    amount: Number
  }
})

export const Client = model('Client', clientSchema)
