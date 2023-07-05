import { Response } from 'express'
import { Product } from '../models/productModel'

export const getByCode = async (req: any, res: Response) => {
  const { code } = req.params
  try {
    const product = await Product.findOne({ code })
    res.status(200).json({
      ok: true,
      data: product
    })
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}
