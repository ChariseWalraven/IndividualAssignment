import { FETCH_STUDENT} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_STUDENT:
    return payload

    default:
    return state
  }
}