import { FETCH_BATCH } from '../actions/batches'

export default function(state = null, {type, payload}){
  switch(type){
    case FETCH_BATCH:
    return payload

    default: 
    return state
  }
}
