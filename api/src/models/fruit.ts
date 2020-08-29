import mongoose, { Schema } from 'mongoose'
import { IFruit } from '../utils/types'


const fruitSchema: Schema = new Schema({
  name: { type: String, required: true },
  best: { type: Boolean, required: true },
  description: { type: String, required: false }
})

fruitSchema.set('toJSON', {
  transform: (_document: IFruit, returnedObject: IFruit) => {
    returnedObject.id = String(returnedObject._id)
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model<IFruit>('Fruit', fruitSchema)
