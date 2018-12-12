import {fromJS, List, Map} from 'immutable'
import {createSelector, createStructuredSelector} from 'reselect'

export function createAction (type, ...argNames) {
  return function (...args) {
    let action = {type}
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export function addEntities (state, list = [], idKey = '', optionalKey) {
  list.forEach(item => {
    state = addEntity(state, item, idKey, optionalKey)
  })
  return state
}

export function addEntity (state, item = {}, idKey = '', optionalKey) {
  let key
  if (item instanceof Map || item instanceof List) {
    key = item.get(idKey)
  } else {
    key = item[idKey]
    item = fromJS(item)
  }
  return state.mergeIn(optionalKey ? ['entities', optionalKey, key] : ['entities', item[idKey]], item)
}

export function addRelationship (state, relName = '', id, list, listIdKey = '') {
  return state.setIn(['relationships', relName, id], List(list.map(item => item[listIdKey])))
}

export function addRelationships (state, list = [], relName = '', id1, id2) {
  let relationships = state.getIn(['relationships', relName], Map()).toJS()
  list.forEach(entity => {
    if (typeof entity[id1] === 'string' && entity[id1].trim() &&
      typeof entity[id2] === 'string' && entity[id2].trim()) {
      const currentRelationship = relationships[entity[id1]]
      if (currentRelationship === undefined) {
        relationships[entity[id1]] = [entity[id2]]
      } else {
        if (currentRelationship.indexOf(entity[id2]) === -1) {
          currentRelationship.push(entity[id2])
        }
        relationships[entity[id1]] = currentRelationship
      }
    }
  })
  return state.setIn(['relationships', relName], fromJS(relationships))
}

export function updateRelationship (state, pathExt = [], list = []) {
  const path = ['relationships', ...pathExt]
  const currentList = state.getIn(path, List())
  const newItems = List(list).filter(id => !currentList.includes(id))

  return state.setIn(path, currentList.concat(newItems))
}

export function removeFromRelationship (state, pathExt = [], id) {
  const path = ['relationships', ...pathExt]

  let currentList = state.getIn(path, List())

  const index = currentList.indexOf(id)

  if (index !== -1) {
    currentList = currentList.delete(index)
  }

  return state.setIn(path, currentList)
}

// list and entities are input selectors, idKey is what the entities are keyed by
export function selectEntitiesInList (list, entities) {
  return createSelector([list, entities], (ids, things) => ids.map(id => things.get(id)))
}

export function createStructuredMapSelector (mapSelectorsToProps) {
  const selector = createStructuredSelector(mapSelectorsToProps)
  return (state, props) => Map(selector(state, props))
}
