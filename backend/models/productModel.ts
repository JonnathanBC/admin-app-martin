import { Schema, model } from 'mongoose'

export const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  supplierCost: {
    type: Number,
    required: true
  },
  iva: {
    type: Number,
    default: 0.12,
    required: true
  },
  micro: {
    type: Number,
    default: 5.55,
    required: true
  },
  salvamentMargin: {
    type: Number,
    default: 0.25,
    required: true
  },
  profitMargin: {
    type: Number,
    default: 0.15,
    required: true
  }
})

export const Product = model('Product', productSchema)
