import mongoose from 'mongoose'

export async function connectDB () {
  try {
    if (process.env.MONGODB_URI == null) {
      throw new Error('Error al encontrar la variable MONGODB_URI')
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB is connected')

    // await Product.create({
    //   name: 'Audifonos',
    //   code: 'HSKJD77',
    //   supplierCost: 25
    // })
  } catch (error) {
    console.log('Error al conectarse a la DB', error)
  }
}
