//Action Types
export const TOGGLE_ALERT = "TOGGLE_ALERT"

//Actions
export const toggleAlert = (value: boolean = false) => ({
  type: TOGGLE_ALERT,
  payload: {value: value}
})
