import { createReducer } from 'redux-act'
import * as actions from '../actions/app'

const initialState = {
  api: API_SERVER, // eslint-disable-line
  hiddenOtherElements: false
}

const handleHiddenOtherElements = (state, payload) => ({
  ...state,
  hiddenOtherElements: payload
})

const reducer = createReducer({
  [actions.hiddenOtherElements]: handleHiddenOtherElements
}, initialState)

export default reducer
