import { Response, Request } from 'express'
import { sendEmail } from '../helpers/mailer'
import { User } from '../models/userModel'

export const login = async (req: Request, res: Response) => {
  const { email } = req.params
  const { code } = req.body

  const user = await User.findOne({ email, loginCode: code })
  if (!user) {
    return res.status(400).json({
      ok: false,
      message: 'Credenciales incorrectas'
    })
  }

  // res.status(200).redirect('http://localhost:3000/')
  res.status(200).json({
    ok: true,
    message: 'Inicio de sesión exitoso'
  })
}

export const generateCode = async (req: Request, res: Response) => {
  const { email } = req.params
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({
      ok: false,
      message: 'Usuario no encontrado'
    })
  }

  let randomCode = ''

  for (let i = 0; i <= 5; i++) {
    const number = Math.floor(Math.random() * 10)
    randomCode += `${number}`
  }

  user.loginCode = randomCode
  await user.save()

  sendEmail({
    to: email,
    subject: 'Código de sessión',
    html: `Código para ingresar: ${randomCode}`
  })

  res.status(200).json({
    ok: true,
    message: 'código enviado con éxito'
  })
}
