import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, getRepository } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {Student, Evaluation} from './index'

@Entity()
export class Batche extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('int')
  number: number

  @Column('text')
  nickname: string

  @Column('date')
  startDate: string

  @Column('date')
  endDate: string

  @OneToMany(_ => Student, student => student.batch)
  @JoinColumn()
  students: Student[]

  @OneToMany(_ => Evaluation, evaluation => evaluation.batch)
  @JoinColumn()
  evaluations: Evaluation[]


  @Column('int', {default:0})
  numberOfStudents: number

  async countStudents(){
  // get repo, count students where batch = id
  const students = await getRepository(Student)
  .createQueryBuilder('student')
  .select()
  .where('student.batch = :id', {id: this.id})
  .getCount()

  this.numberOfStudents = students
  }
}