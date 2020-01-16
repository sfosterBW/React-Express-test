export interface Fruit {
  _id: number,
  name: string,
  best: boolean;
}

export interface FruitResponse {
  data: any
  status: number
  statusText: string
  headers: Headers
  config: object
  request: XMLHttpRequest
}
