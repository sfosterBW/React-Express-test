//Action const
export const TOGGLE_ALERT = "TOGGLE_ALERT"

//Action shape
interface ToggleAlert {
  type: typeof TOGGLE_ALERT,
  payload: boolean
}

//Action type
export type AlertActionTypes = ToggleAlert

//Action
export function toggleAlert(alertValue: boolean): AlertActionTypes {
  return {
    type: TOGGLE_ALERT,
    payload: alertValue
  }
}

//Action const
export const TOGGLE_MODAL = "TOGGLE_MODAL"

//Action shape
interface ToggleModal {
  type: typeof TOGGLE_MODAL,
  payload: boolean
}

//Action type
export type ModalActionTypes = ToggleModal

//Action
export function toggleModal(modalValue: boolean): ModalActionTypes {
  return {
    type: TOGGLE_MODAL,
    payload: modalValue
  }
}
