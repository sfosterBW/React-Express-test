//Objects
export interface Fruit {
  id: string
  name: string
  best: boolean
}

export type NewFruit = Omit<Fruit, 'id'>

//States
export interface AlertState {
  toggle: boolean
}

export interface FruitState {
  data: Fruit[]
}

export interface ModalState {
  toggle: boolean,
  fruit?: Fruit
}
