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

export const getClientById = async (req: any, res: Response) => {
  // node recibe los parametros de las url por req.paramas siempre que queremos hacer un edit o delete debemos de sacar de ahí el id.
  const { id } = req.params
  try {
    const client = await Client.findById(id)
    res.status(200).json({ ok: true, data: client })
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

export const updateClient = async (req: any, res: Response) => {
  const { id } = req.params
  const { body } = req

  try {
    const client = await Client.findByIdAndUpdate(id, body, { new: true })
    res.status(201).json({ ok: true, data: client })
  } catch (e: any) {
    res.status(500).json({
      ok: false,
      message: e.message
    })
  }
}
