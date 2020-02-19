//Objects
export interface IFruit {
  _id: number | undefined
  name: string
  best: boolean
}

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
  fruit: IFruit
}
