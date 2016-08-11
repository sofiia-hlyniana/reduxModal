import { combineReducers } from 'redux'
import modalReducer from './modals'
import formReducer from './form'

export default combineReducers({
  modals: modalReducer,
  form: formReducer
})