import {Map, fromJS} from 'immutable'
import * as actions from './actions.js'

function Git (state = Map(), {type, ...action}) {
  switch (type) {
    case actions.FETCH_GITHUB_DATA:
      return state.set('gitData', fromJS(action.gitData))
    default:
      return state
  }
}

Git.key = 'git'
export default Git
