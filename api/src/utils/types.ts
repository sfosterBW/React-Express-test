import { Document } from 'mongoose'

export interface IFruit extends Document {
  id: string
  name: string
  best: boolean
  description?: string
}

export type NewFruit = Pick<IFruit, 'name' | 'best' | 'description'>
