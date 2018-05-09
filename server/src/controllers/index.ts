import { JsonController, Get, Param, Put, Body, Post, Delete, NotFoundError, BadRequestError } from 'routing-controllers'
import { IsString } from 'class-validator'
import { Student, Teacher, Evaluation } from '../entities'
import { Batche } from '../entities/batch'
import { getRepository } from "typeorm";
import colorPicker from '../logic/colorPicker'
import calculatePercentage from '../logic/calculatePercentage';
import { sign } from '../jwt'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export class StudentController {
  @Get('/students')
  async all() {
    const students = await Student.find()
    if (!students) throw new NotFoundError(`Students table doesn't exist`)
    return { students }
  }

  @Post('/students')
  async createStudent(
    @Body() student: Student
  ) {
    const { id, ...info } = student
    const entity = Student.create(info)
    entity.batch = await Batche.findOne({where: {batch: id}})
    return entity.save()
  }

  @Get('/students/:id')
  async student(
    @Param('id') id: number
  ) {
    const student = await Student.findOne(id)
    return { student }
  }

  // gets all evaluations associated with a student
  @Get('/students/:id/evaluations')
  async getEvals(
    @Param('id') id: number
  ) {
    //get all evaluations associated with a student
    const studentEvaluations = await getRepository(Evaluation)
      .createQueryBuilder('evaluations')
      .select()
      .where("evaluations.student_id = :id",{id})
      .getMany()

      //return evlauations and percentage of colors
      let obj = {studentEvaluations}
      let percentage = await calculatePercentage(obj)
      return {studentEvaluations, percentage }
  }

  @Put('/students/:id')
  async editStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOne(id)
    if (!student) throw new NotFoundError('Student doesn\'t exist')

    return Student.merge(student, update).save()
  }

  @Delete('/students/:id')
  async deleteStudent(
    @Param('id') id: number
  ) {
    const student = await Student.findOne(id)
    if (!student) throw new NotFoundError('User doesn\'t exist')
    if (student) Student.remove(student)
    return 'successfully deleted'
  }
}

@JsonController()
export class TeacherController {
  @Get('/teachers')
  async all() {
    const teachers = await Teacher.find()
    if (!teachers) throw new NotFoundError(`Teachers table doesn't exist`)
    return { teachers }
  }
  // to sign up
  @Post('/teachers')
  async createTeacher(
    @Body() teacher: Teacher
  ) {
    const { password, ...rest } = teacher
    const entity = Teacher.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }
  // to log in
  @Post('/logins')
  async authenticate(
    @Body() { email, password }: AuthenticatePayload
  ) {
    const teacher = await Teacher.findOne({ where: { email } })

    if (!teacher) throw new BadRequestError('A user with this email does not exist')

    if (!await teacher.checkPassword(password)) throw new BadRequestError('The password is not correct')

    const jwt = sign({ id: teacher.id! })
    return { jwt, teacher }

  }

}

@JsonController()
export class BatchController {
  @Get('/batches')
  async all() {
    const batches = await Batche.find()
    if (!batches) throw new NotFoundError(`Batches table doesn't exist`)
    return { batches }
  }

  @Post('/batches')
  async createBatch(
    @Body() batch: Batche
  ) {
    const { ...rest } = batch
    const entity = Batche.create(rest)
    entity.save()

    return entity
  }

  @Get('/batches/:id')
  async batch(
    @Param('id') id: number
  ) {
    const batch = await Batche.findOne(id)
    return { batch }
  }

  // gets all students associated with this one batch
  @Get('/batches/:id/students')
  async students(
    @Param('id') id: number
  ) {
    const students = await getRepository(Student)
      .createQueryBuilder("student")
      .select()
      .where("student.batch_id = :id", { id })
      .getMany()
      
      //get all evaluations from all students in this batch
    const studentEvaluations = await getRepository(Evaluation)
      .createQueryBuilder("evaluation")
      .select()
      .where("evaluation.batch_id = :id", {id})
      .getMany()

      let obj = {studentEvaluations}
      let percentages = await calculatePercentage(obj)

    return { students, percentages }
  }


}

@JsonController()
export class EvaluationController {
  @Get('/evaluations')
  async all() {
    const evaluations = await Evaluation.find()
    if (!evaluations) throw new NotFoundError(`Evaluations table doesn't exist`)
    return { evaluations }
  }

  @Post('/evaluations')
  async createEvaluation(
    @Body() evaluation: Evaluation
  ) {
    const { id, ...rest } = evaluation
    const entity = Evaluation.create(rest)
    entity.student = await Student.findOne(id) // dunno how to get this to go away
    entity.batch = await Batche.findOne(entity.student.batch.id) // or this...
    await entity.getDate()
    const last = await getRepository(Evaluation)
      .createQueryBuilder("evaluation")
      .select('evaluation.date')
      .where('evaluation.student_id = :id', { id: evaluation.id })
      .orderBy({
        "date": "DESC"
      })
      .getOne()

    let today = new Date().toJSON().slice(0, 10)
    let date = Object.values(last)[0] // or this...

    if (date === today) throw new Error('Cannot evaluate a student more than once a day. Please edit your last evaluation instead')
      // return {entity}
    return entity.save()
  }

  @Get('/evaluations/:id')
  async evaluation(
    @Param('id') id: number
  ) {
    const evaluation = await Evaluation.findOne(id)
    return { evaluation }
  }

  @Put('/evaluations/:id')
  async editEvaluation(
    @Param('id') id: number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOne(id)
    if (!evaluation) throw new NotFoundError('Evaluation doesn\'t exist')

    return Evaluation.merge(evaluation, update).save()
  }
}

@JsonController()
export class QuestionController {
  @Get('/question')
  async getQuestion() {

    const student = await getRepository(Evaluation)
      .createQueryBuilder("evaluation")
      .select('evaluation.student_id')
      .where("evaluation.color = :color", { color: await colorPicker() })
      .orderBy({
        "date": "DESC"
      })
      .getRawOne();

    const theChosenOne = await Student.findOne(student.student_id)

    return { theChosenOne }

  }
}