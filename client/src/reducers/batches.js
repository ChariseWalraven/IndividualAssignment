import {FETCH_BATCHES, CREATE_BATCH, ADD_BATCH, FETCH_STUDENTS} from '../actions/batches'

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