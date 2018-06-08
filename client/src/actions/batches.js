import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'
import * as request from 'superagent'

export const FETCH_BATCHES = "FETCH_BATCHES"
export const FETCH_BATCH = "FETCH_BATCH"
export const CREATE_BATCH = "CREATE_BATCH"
export const ADD_BATCH = "ADD_BATCH"
export const FETCH_BATCH_STUDENTS = "FETCH_BATCH_STUDENTS"

export const ADD_STUDENT = "ADD_STUDENT"
export const DELETE_STUDENT = "DELETE_STUDENT"
export const FETCH_STUDENTS = "FETCH_STUDENTS"
export const FETCH_STUDENT_EVALUATIONS = "FETCH_STUDENT_EVALUATIONS"
export const FETCH_STUDENT = "FETCH_STUDENT"

export const SUBMIT_EVALUATION = "SUBMIT_EVALUATION"
export const FETCH_BATCH_EVALUATIONS = "FETCH_BATCH_EVALUATIONS"


export const addBatch = batch => ({
  type: ADD_BATCH,
  payload: batch
})

export const addStudent = student => ({
  type: ADD_STUDENT,
  payload: student
})

export const deleteStudent = student => ({
  type: DELETE_STUDENT,
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
  if (isExpired(jwt)) return dispatch(logout())

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
      payload: res.body
    }))
    .catch(err => console.error(err))
}

export const fetchBatchEvaluations = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  
  request
    .get(`${baseUrl}/batches/${id}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => dispatch({
      type: FETCH_BATCH_EVALUATIONS,
      payload: res.body.evaluations
    }))
    .catch(err => console.error(err))
}

export const createStudent = (student, id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  // if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(student)
    .then(dispatch(addStudent(student)))
    .catch(err => console.error(err))
}

export const removeStudent = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  // if (isExpired(jwt)) return dispatch(logout())
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

export const submitEvaluation = (id, data) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  request
  .post(`${baseUrl}/students/${id}/evaluations`)
  .set('Authorization', `Bearer ${jwt}`)
  .send(data)
  .then(res => dispatch({
    type: SUBMIT_EVALUATION,
    payload: res.body
  }))
}