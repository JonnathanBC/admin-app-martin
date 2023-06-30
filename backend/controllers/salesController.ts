import { Response } from 'express'
import { Sale } from '../models/saleModel'

export const getAllSales = async (req: any, res: Response) => {
  try {
    const sales = await Sale.find({ user: req.user.sub })
    res.status(200).json({
      ok: true,
      data: sales
    })
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

export const createSale = async (req: any, res: Response) => {
  const { operationDate, totalAmount } = req.body
  const user = req.user

  const newSale = await Sale.create({
    operationDate,
    totalAmount,
    user: user.sub
  })

  res.status(201).json({ ok: true, data: newSale })
}
