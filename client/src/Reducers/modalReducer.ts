import { Fruit } from '../utils/interfaces'

interface State {
  toggle: boolean;
  fruit?: Fruit;
}

//Action const
const TOGGLE_MODAL = 'TOGGLE_MODAL'
const OPEN_MODAL = 'OPEN_MODAL'

//Action shape
interface ToggleModal {
  type: typeof TOGGLE_MODAL;
  payload: boolean;
}

interface OpenModal {
  type: typeof OPEN_MODAL;
  payload: Fruit;
}

//Action type
export type Actions = ToggleModal | OpenModal

export const initState: State = { toggle: false }

export const reducer = (state = initState, action: Actions): State => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, toggle: action.payload || false }
    case OPEN_MODAL:
      return { toggle: true, fruit: action.payload }
    default:
      return state
  }
}

//Action
export const toggleModal = (modalValue: boolean): Actions => {
  return {
    type: TOGGLE_MODAL,
    payload: modalValue,
  }
}

export const openModal = (fruit: Fruit): Actions => {
  return {
    type: OPEN_MODAL,
    payload: fruit,
  }
}

export default reducer
