import mongoose from 'mongoose'

export async function connectDB () {
  try {
    if (process.env.MONGODB_URI == null) {
      throw new Error('Error al encontrar la variable MONGODB_URI')
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB is connected')

    // await Sale.create({
    //   operationDate: new Date(),
    //   user: '649d0ca028851c0c40d9fc29',
    //   totalAmount: 5000
    // })
  } catch (error) {
    console.log('Error al conectarse a la DB', error)
  }
}
