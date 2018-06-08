import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/users'
import { jwtSecret, localStorageJwtKey } from '../constants'
import * as jwt from 'jsonwebtoken'


let initialState = null

try {
  const jwtToken = localStorage.getItem(localStorageJwtKey)
  const teacher = jwt.verify(jwtToken, jwtSecret)

  if (jwt) {
    initialState = { jwt: jwtToken, teacher }
  }
}
catch (e) {
  console.log(`Error retrieving data from local storage`, e)
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return payload

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}
