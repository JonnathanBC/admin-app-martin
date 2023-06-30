import { Response } from 'express'
import { Client } from '../models/clientModel'

export const getAllClients = async (req: any, res: Response) => {
  try {
    const clients = await Client.find()
    res.status(200).json({
      ok: true,
      data: clients
    })
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

export const createClient = async (req: any, res: Response) => {
  try {
    const newClient = await Client.create(req.body)
    res.status(201).json({ ok: true, data: newClient })
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}
