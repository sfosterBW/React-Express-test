import { Document } from 'mongoose'

export interface IFruit extends Document {
  id: string
  name: string
  best: boolean
}

export type NewFruit = Pick<IFruit, 'name' | 'best'>
