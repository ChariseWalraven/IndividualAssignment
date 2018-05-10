import {FETCH_BATCHES, ADD_BATCH} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_BATCHES:
    return payload

    case ADD_BATCH:
    return state.concat(payload)

    default:
    return state
  }
} 