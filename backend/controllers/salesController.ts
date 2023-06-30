import { Response } from 'express'
import { Sale } from '../models/saleModel'

export const getAllSales = async (req: any, res: Response) => {
  try {
    const { user } = req
    const sales = await Sale.find({ user: user?.sub })
    res.status(200).json({
      ok: true,
      data: sales
    })
  } catch (e: any) {
    res.status(401).json({ ok: false, message: e.message })
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
