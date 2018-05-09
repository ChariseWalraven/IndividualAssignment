import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'
import * as req from 'superagent'

export const FETCH_BATCHES = "FETCH_BATCHES"
export const CREATE_BATCH = "CREATE_BATCH"
export const ADD_BATCH = "ADD_BATCH"
export const ADD_STUDENT = "ADD_STUDENT"
export const FETCH_STUDENTS = "FETCH_STUDENTS"

export const addBatch = batch => ({
  type: ADD_BATCH,
  payload: batch
})

export const addStudent = student => ({
  type: ADD_STUDENT,
  payload: student
})

export const fetchBatches = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  
  request
  .get(`${baseUrl}/batches`)
  .set('Authorization', `Bearer ${jwt}`)
  .then(res => dispatch({
    type: FETCH_BATCHES,
    payload: res.body.batches
  }))
  .catch(err => console.error(err))
}

export const createBatch = (batch) => (dispatch, getState) =>{
  const state = getState()
  const jwt = state.currentUser.jwt
  // const {nickname, startDate, endDate} = batch
  // if (isExpired(jwt)) return dispatch(logout())
  
  req
    .post(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(batch)
    .then(res => dispatch(addBatch(batch)))
    .catch(err => console.error(err))
}

export const fetchStudents = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  req
  .get(`${baseUrl}/students`)
  .set('Authorization', `Bearer ${jwt}`)
  .then(res => dispatch({
    type: FETCH_STUDENTS,
    payload: res.body.students
  }))
  .catch(err => console.error(err))
}

export const createStudent = (student) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  req
  .post(`${baseUrl}/students`)
  .send(student)
  .then(res => dispatch(addStudent(student)))
  .catch(err => console.error(err))
}