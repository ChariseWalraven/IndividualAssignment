import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'
import * as request from 'superagent'

export const FETCH_BATCHES = "FETCH_BATCHES"
export const FETCH_BATCH = "FETCH_BATCH"
export const CREATE_BATCH = "CREATE_BATCH"
export const ADD_BATCH = "ADD_BATCH"
export const ADD_STUDENT = "ADD_STUDENT"
export const FETCH_STUDENTS = "FETCH_STUDENTS"
export const FETCH_STUDENT_EVALUATIONS = "FETCH_STUDENT_EVALUATIONS"
export const FETCH_STUDENT = "FETCH_STUDENT"
export const FETCH_BATCH_STUDENTS = "FETCH_BATCH_STUDENTS"

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
export const fetchBatch = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/batches/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => dispatch({
      type: FETCH_BATCH,
      payload: res.body.batch
    }))
    .catch(err => console.error(err))
}

export const createBatch = (batch) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  // const {nickname, startDate, endDate} = batch
  // if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(batch)
    .then(res => dispatch(addBatch(batch)))
    .catch(err => console.error(err))
}

export const fetchStudents = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => dispatch({
      type: FETCH_STUDENTS,
      payload: res.body.students
    }))
    .catch(err => console.error(err))
}
export const fetchStudent = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => dispatch({
      type: FETCH_STUDENT,
      payload: res.body.student
    }))
    .catch(err => console.error(err))
}
export const fetchBatchStudents = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  request
    .get(`${baseUrl}/batches/${id}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => dispatch({
      type: FETCH_BATCH_STUDENTS,
      payload: res.body.students
    }))
    .catch(err => console.error(err))
}

export const createStudent = (student, id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  console.log(student)
  request
    .post(`${baseUrl}/students`)
    .send(student)
    .then(res => dispatch(addStudent(student)))
    .catch(err => console.error(err))
}

export const fetchStudentEvaluations = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students/${id}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => dispatch({
      type: FETCH_STUDENT_EVALUATIONS,
      payload: res.body
    }))
}