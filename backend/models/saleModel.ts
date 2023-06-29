import { Schema, Types, model } from 'mongoose'
import { User } from './userModel'

const saleSchema = new Schema({
  operationDate: {
    type: Date
  },
  totalAmount: {
    type: Number
  },
  user: {
    type: Types.ObjectId,
    ref: User
  }
})

export const Sale = model('Sale', saleSchema)
