//Objects
export interface Fruit {
  id: string
  name: string
  best: boolean
}

export type NewFruit = Omit<Fruit, 'id'>
