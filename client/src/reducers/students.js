import {FETCH_STUDENTS, ADD_STUDENT, FETCH_BATCH_STUDENTS} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_STUDENTS:
    return payload

    case FETCH_BATCH_STUDENTS:
    return payload.students

    case ADD_STUDENT:
    return state.concat(payload)

    default:
    return state
  }
}