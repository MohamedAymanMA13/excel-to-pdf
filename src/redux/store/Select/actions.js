import { SELECT, UNSELECT, SELECT_ALL, UNSELECT_ALL, SELECT_ROW } from 'redux/store/actionTypes'

export const UnselectAll = items => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UNSELECT_ALL, payload: { collection: items } })
      resolve()
    })
  }
}
export const Select = (items, selectedItem, radioButton) => {
  return dispatch => {
    if (radioButton) {
      dispatch(UnselectAll(items))
    }
    dispatch({ type: SELECT, payload: { collection: items, selectedItem, radioButton } })
  }
}
export const Unselect = (items, selectedItem) => {
  return dispatch => dispatch({ type: UNSELECT, payload: { collection: items, selectedItem } })
}

export const SelectRow = (items, selectedItem) => {
  return dispatch => dispatch({ type: SELECT_ROW, payload: { collection: items, selectedItem } })
}

export const SelectAll = (elements, selectedItem) => {
  return dispatch => dispatch({ type: SELECT_ALL, payload: { collection: selectedItem, elements } })
}
