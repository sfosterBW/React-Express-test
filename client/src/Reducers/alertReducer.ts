//State types
interface State {
  toggle: boolean,
  message: string
}

export const initState: State = {
  toggle: false,
  message: ''
}

//Action const
const TOGGLE_ALERT = "TOGGLE_ALERT"

//Action shape
export interface ToggleAlert {
  type: typeof TOGGLE_ALERT,
  payload: {
    message: string
    toggle: boolean
  }
}

//Action type
type Actions = ToggleAlert

export const reducer = (state = initState, action: Actions): State => {
  switch (action.type) {
    case TOGGLE_ALERT:
      const { toggle, message}  = action.payload
      return { ...state, toggle, message }
    default:
      return state
  }
}

//Action
export const toggleAlert = (message: string, toggle: boolean): Actions => {
  return {
    type: TOGGLE_ALERT,
    payload: { message, toggle }
  }
}

export default reducer
