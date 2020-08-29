export interface Fruit {
  id: string
  name: string
  best: boolean
  description?: string
}

export type NewFruit = Omit<Fruit, 'id'>
