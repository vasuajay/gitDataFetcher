/**
 * ALL reducers should go here.
 * The combined reducer is then fed into the store.
 */
import {combineReducers} from 'redux-immutable'
import {LOCATION_CHANGE} from 'react-router-redux'
import http from './http/redux'
import {FormsReducer} from '../utils/form_utils'
import {fromJS} from 'immutable'

// import Dashboard from '../../src/modules/Dashboard/redux/reducer'
import Git from '../../src/Git/redux/reducers'

const initialState = fromJS({
  locationBeforeTransitions: null
})

function Routes (state = initialState, {type, payload} = {}) {
  if (type === LOCATION_CHANGE) {
    return state.merge({locationBeforeTransitions: fromJS(payload)})
  }

  return state
}

export default combineReducers({
  Routes,
  [http.key]: http,
  Forms: FormsReducer,
  [Git.key]: Git
  // [Dashboard.key]: Dashboard,
})
