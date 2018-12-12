import {Map, fromJS} from 'immutable'
import {createAction} from './redux_utils'

/*
** Form Actions
*/
export const FORM_SET_INITIAL_VALUES = 'FORM_SET_INITIAL_VALUES'
export const setInitialValues = createAction(FORM_SET_INITIAL_VALUES, 'formName', 'values')

export const FORM_SET_VALUE = 'FORM_SET_VALUE'
export const setValue = createAction(FORM_SET_VALUE, 'formName', 'field', 'value')

export const FORM_MERGE_INITIAL_VALUES = 'FORM_MERGE_INITIAL_VALUES'
export const mergeInitialValues = createAction(FORM_MERGE_INITIAL_VALUES, 'formName', 'values')

export const FORM_RESET = 'FORM_RESET'
export const reset = createAction(FORM_RESET, 'formName')

export const FORM_DELETE_FIELD = 'FORM_DELETE_FIELD'
export const deleteField = createAction(FORM_DELETE_FIELD, 'formName', 'field')

/*
** Form Reducer
*/
export function FormsReducer (state = Map(), {type, ...action}) {
  switch (type) {
    case FORM_SET_INITIAL_VALUES:
      return state
        .setIn([action.formName, 'initialValues'], fromJS(action.values))
        .setIn([action.formName, 'currentValues'], fromJS(action.values))
    case FORM_SET_VALUE:
      let path = action.field
      if (!Array.isArray(path)) {
        path = [path]
      }
      return state.setIn([action.formName, 'currentValues', ...path], action.value)
    case FORM_MERGE_INITIAL_VALUES:
      return state
        .mergeIn([action.formName, 'initialValues'], fromJS(action.values))
        .mergeIn([action.formName, 'currentValues'], fromJS(action.values))
    case FORM_RESET:
      return state.setIn([action.formName, 'currentValues'], state.getIn([action.formName, 'initialValues'], Map()))
    case FORM_DELETE_FIELD: {
      let path = action.field
      if (!Array.isArray(path)) {
        path = [path]
      }
      return state.deleteIn([action.formName, 'currentValues', ...path])
    }
    default:
      return state
  }
}

FormsReducer.key = 'Forms'

/*
** Form Selectors
*/
export const currentValues = (state, {formName}) => state.getIn(['Forms', formName, 'currentValues'], Map())
export const initialValues = (state, {formName}) => state.getIn(['Forms', formName, 'initialValues'], Map())
