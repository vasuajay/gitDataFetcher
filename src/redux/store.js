import {Map} from 'immutable'
import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducer from './reducer'
import logger from 'redux-logger'

export const history = createHistory()
const middlewares = [
  thunk,
  routerMiddleware(history)
]

if (global.LOGGER) {
  middlewares.push(logger)
}

const store = createStore(
  reducer,
  Map(),
  compose(
    applyMiddleware(...middlewares),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
