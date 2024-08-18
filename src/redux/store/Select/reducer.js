import { SELECT, UNSELECT, SELECT_ALL, UNSELECT_ALL, SELECT_ROW } from 'redux/store/actionTypes'

const initialState = {}

const Select = (state = initialState, action) => {
  switch (action.type) {
    case SELECT: {
      //   state[action.payload.collection] = state[action.payload.collection]
      //     ? state[action.payload.collection].concat(action.payload.selectedItem)
      //     : [action.payload.selectedItem];

      if (state[action.payload.collection])
        return {
          ...state,
          [action.payload.collection]: [...state[action.payload.collection], action.payload.selectedItem],
        }

      return {
        ...state,
        [action.payload.collection]: [action.payload.selectedItem],
      }
    }

    case UNSELECT: {
      // state[action.payload.collection] = state[
      //   action.payload.collection
      // ].filter(item => item.id !== action.payload.selectedItem.id);

      const updatedCollection = state[action.payload.collection].filter(
        item => item.id !== action.payload.selectedItem.id,
      )

      return {
        ...state,
        [action.payload.collection]: updatedCollection,
      }
    }

    case SELECT_ALL: {
      let updatedElements
      if (action.payload.elements) {
        updatedElements = Array.from(new Set(action.payload.elements.map(a => a.id))).map(id => {
          return action.payload.elements.find(a => a.id === id)
        })

        // state[action.payload.collection] = [...elements];
      }

      return {
        ...state,
        [action.payload.collection]: updatedElements ? [...updatedElements] : [],
      }
    }

    case UNSELECT_ALL: {
      // state[action.payload.collection] = [];
      return {
        ...state,
        [action.payload.collection]: [],
      }
    }

    case SELECT_ROW: {
      // state[action.payload.collection] = action.payload.selectedItem;

      return {
        ...state,
        [action.payload.collection]: action.payload.selectedItem,
      }
    }

    default:
      return state
  }
}
export default Select
