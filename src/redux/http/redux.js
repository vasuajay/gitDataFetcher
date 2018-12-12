import {Map, fromJS} from 'immutable'

export const HTTP_SENDING_REQUEST = 'http/sending-request'
export const HTTP_RECEIVED_RESPONSE = 'http/received-response'
export const HTTP_CLEAR_REQUEST = 'http/clear-request'

export function sendingRequest (id) {
  return {
    type: HTTP_SENDING_REQUEST,
    id
  }
}

export function receivedResponse (id, response = null) {
  const action = {
    type: HTTP_RECEIVED_RESPONSE,
    id
  }
  if (response) action.response = response
  return action
}

export function clearRequest (id) {
  return {type: HTTP_CLEAR_REQUEST, id}
}

export default function http (state = Map(), action) {
  switch (action.type) {
    case HTTP_SENDING_REQUEST:
      return state.setIn(['requests', action.id], fromJS({loading: true}))
    case HTTP_RECEIVED_RESPONSE: {
      const data = {loading: false}
      if (action.response) data.response = action.response
      return state.setIn(['requests', action.id], fromJS(data))
    }
    case HTTP_CLEAR_REQUEST:
      return state.deleteIn(['requests', action.id])
    default:
      return state
  }
}

http.key = 'http'

export function isRequestLoading (state, requestId) {
  return getRequest(state, requestId).get('loading', false)
}

export function getRequest (state, requestId) {
  return state.getIn(['http', 'requests', requestId], Map())
}
