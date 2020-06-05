//Objects
export interface IFruit {
  id: string
  name: string
  best: boolean
}

export type NewFruit = Omit<IFruit, 'id'>

export interface IFruitResponse {
  status: number
}

//States
export interface AlertState {
  toggle: boolean
}

export interface FruitState {
  data: IFruit[]
}

export interface ModalState {
  toggle: boolean,
  fruit?: IFruit
}
