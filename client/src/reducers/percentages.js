import {FETCH_BATCH_STUDENTS} from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_BATCH_STUDENTS:
    return payload.percentages

    default:
    return state
  }
}