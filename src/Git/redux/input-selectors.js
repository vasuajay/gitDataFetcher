import {Map} from 'immutable'

export const gitData = (state) => {
  return state.getIn(['git', 'gitData'], Map())
}
