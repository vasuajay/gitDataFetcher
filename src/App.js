import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import GitDisplay from './Git/components/GitDisplay'
import store from './redux/store'
// import axios from 'axios'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <GitDisplay />
      </Provider>
    )
  }
}

export default connect(null, null)(App)

ReactDOM.render(<App />, document.getElementById('app'))
