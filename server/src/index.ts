import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import setupDb from './db'
import {StudentController, TeacherController, BatchController, EvaluationController, QuestionController} from './controllers'
// import {seedBatches, seedStudents} from './seed'

const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
  controllers: [
    StudentController,
    TeacherController,
    BatchController,
    EvaluationController,
    QuestionController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  // .then(_ => {
  //   seedBatches()
  // })
  // .then(_ => {
  //   seedStudents()
  // })
  .catch(err => console.error(err))