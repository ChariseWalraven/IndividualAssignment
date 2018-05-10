import { FETCH_BATCH_EVALUATIONS } from '../actions/batches'

export default function (state = null, { type, payload }) {
  switch (type) {
    case FETCH_BATCH_EVALUATIONS:
      return payload

    default:
      return state
  }
}
