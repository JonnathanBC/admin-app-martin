import nodemailer from 'nodemailer'

interface EmailProps {
  to: string
  subject: string
  html: string
  bcc?: string
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // seguridad en gmail
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

export async function sendEmail ({ to, subject, html, bcc }: EmailProps) {
  try {
    const result = await transporter.sendMail({
      from: '<Company jonnabcl56@gmail.com>',
      to,
      bcc,
      subject,
      html
    })

    console.log({ result })
    return {
      ok: true,
      message: 'Email enviado con éxito'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Hubo un problema al enviar el email',
      err: error
    }
  }
}
