import {gitData} from './redux/input-selectors'
import {createStructuredSelector} from 'reselect'

export const gitHubData = createStructuredSelector({
  gitData
})
