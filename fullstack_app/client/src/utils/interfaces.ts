//Objects
export interface IFruit {
  _id: number
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

export interface ModalState {
  toggle: boolean
}
