import { FETCH_STUDENT, FETCH_STUDENT_EVALUATIONS} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_STUDENT:
    return payload

    case FETCH_STUDENT_EVALUATIONS:
    return state.concat(payload) //???

    default:
    return state
  }
}