import {FETCH_STUDENTS, ADD_STUDENT, FETCH_BATCH_STUDENTS, REMOVE_STUDENT} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_STUDENTS:
    return payload

    case FETCH_BATCH_STUDENTS:
    return payload.students

    case ADD_STUDENT:
    return state.concat(payload)

    case REMOVE_STUDENT:
      return state.filter(s => s.id !== payload)

    default:
    return state
  }
}