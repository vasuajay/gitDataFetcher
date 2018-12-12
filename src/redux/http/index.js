import axios from 'axios'
import config from '../../config'
// import {addErrorInterceptor} from 'c2-error'
import {Map} from 'immutable'

import browserStorage from '../../browserStorage'

const ajax = axios.create({baseURL: config.apiBaseURL})

ajax.interceptors.request.use(client => {
  let headers = {
    Accept: 'application/json'
  }
  const fullToken = Map(browserStorage.get('auth-token') || {})
  if (fullToken.size > 0) {
    headers.Authorization = fullToken.get('token', '')
  }
  client.headers = headers
  return client
})

// addErrorInterceptor(ajax)

export default ajax

export const rawClient = axios.create({baseURL: config.apiBaseURL})
