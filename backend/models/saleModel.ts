import { Schema, Types, model } from 'mongoose'
import { User } from './userModel'
import { productSchema } from './productModel'
import { Client } from './clientModel'

const paymentMethodSchema = new Schema({
  method: { type: String },
  amount: {
    type: Number,
    required: true
  },
  timeValue: {
    type: Number,
    required: true
  },
  timeUnit: {
    type: Number,
    required: true
  }
})

const saleSchema = new Schema({
  operationDate: { type: Date },
  totalAmount: Number,
  products: [productSchema],
  paymentMethods: [paymentMethodSchema],
  user: {
    type: Types.ObjectId,
    ref: User
  },
  client: {
    type: Types.ObjectId,
    ref: Client
  }
})

export const Sale = model('Sale', saleSchema)
