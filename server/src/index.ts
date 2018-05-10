import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError } from "routing-controllers"
import setupDb from './db'
import {StudentController, TeacherController, BatchController, EvaluationController, QuestionController} from './controllers'
import {Teacher} from './entities'
import { secret, verify } from './jwt'

const port = process.env.PORT || 4002

const app = createKoaServer({
  cors: true,
  controllers: [
    StudentController,
    TeacherController,
    BatchController,
    EvaluationController,
    QuestionController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')

      if (token) {
        const { id } = verify(token)
        return Teacher.findOne(id)
      }
    }
    return undefined
  }
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))