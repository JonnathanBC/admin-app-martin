import mongoose from 'mongoose'

export async function connectDB () {
  try {
    if (process.env.MONGODB_URI == null) {
      throw new Error('Error al encontrar la variable MONGODB_URI')
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB is connected')

    /* const defaultUser = new User({
      firstname: 'Jonnathan',
      lastname: 'Baculima',
      email: 'jonnabcl56@gmail.com',
      loginCode: '123456',
      roles: {
        admin: true,
        seller: true
      }
    })
    await defaultUser.save() */
  } catch (error) {
    console.log('Error al conectarse a la DB', error)
  }
}
