import {FETCH_STUDENTS, ADD_STUDENT} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_STUDENTS:
    return payload

    case ADD_STUDENT:
    return state.concat(payload)

    default:
    return state
  }
}